"""掲載した解答を、数式変形とは別の道（数値積分・全探索）で確かめる。

`npm run check:solutions` で実行する。解説を足したら、その大問の確認もここに足す。
「自分の式変形をもう一度たどる」のではなく、**別の方法で同じ答えに着く**ことを見る。
  ・大問1 … 面積を数値積分で、最小値を細かい刻みの全探索で
  ・大問2 … 平面と直線の交わりを、法線を外積で取り直して連立で
  ・大問3 … 積が N! になる組を全探索で数え上げ
  ・大問4 … 確率を分数のまま直接追い、2次元の歩きそのものでも確かめる
"""
import math
from fractions import Fraction


def quad(f, lo, hi, n=200001):
    """シンプソン法。scipy を入れずに済ませるため、この1か所だけ自前で持つ。"""
    h = (hi - lo) / (n - 1)
    s = 0.0
    for i in range(n):
        x = lo + i * h
        if x <= 0:  # 1/x の端点を避ける
            x = lo + 1e-12
        w = 1 if i in (0, n - 1) else (4 if i % 2 else 2)
        s += w * f(x)
    return (s * h / 3, 0.0)

NG = 0


def ok(name, cond, extra=""):
    global NG
    if not cond:
        NG += 1
    print(("OK  " if cond else "NG  ") + name + ("  " + extra if extra else ""))


# ── 大問1 ───────────────────────────────────────────────
# (1) S = log(b/a)
def area(a, b):
    f1 = quad(lambda x: x/a**2 - x/b**2, 0, a)[0]
    f2 = quad(lambda x: 1/x - x/b**2, a, b)[0]
    return f1 + f2
for a, b in [(0.3, 1.7), (0.6, 0.9), (0.8, 5.0), (0.25, 3.3)]:
    ok(f"1(1) a={a} b={b}", abs(area(a,b) - math.log(b/a)) < 1e-6, f"数値{area(a,b):.10f} 式{math.log(b/a):.10f}")

# (2) θ=π/4 のとき b = sqrt((1+a^2)/(1-a^2))
for a in [0.2, 0.5, 0.643, 0.9]:
    b = math.sqrt((1+a*a)/(1-a*a))
    th = math.atan(1/a**2) - math.atan(1/b**2)
    ok(f"1(2) a={a}", abs(th - math.pi/4) < 1e-12, f"θ={th:.12f}")
    ok(f"1(2) a<b a={a}", a < b)

# (3) S を最小にする a = sqrt(sqrt2 - 1)、最小値 log(1+sqrt2)
S = lambda a: math.log(math.sqrt((1+a*a)/(1-a*a))/a)
astar = math.sqrt(math.sqrt(2)-1)
grid = [i/100000 for i in range(1, 100000)]
amin = min(grid, key=S)
ok("1(3) 最小を与える a", abs(amin - astar) < 1e-4, f"全探索{amin:.6f} 式{astar:.6f}")
ok("1(3) 最小値 log(1+√2)", abs(S(astar) - math.log(1+math.sqrt(2))) < 1e-12, f"{S(astar):.12f}")

# ── 大問2 ───────────────────────────────────────────────
def meets(a, seg):
    """平面H(3点A,B,C)と直線/線分DEが交わるか、を独立に（連立で）確かめる。"""
    A=(2,1,3); B=(a+2,3,4); C=(1,0,0); D=(-1,2,1); E=(-3,1,0)
    # 法線を外積で
    u=[A[i]-C[i] for i in range(3)]; v=[B[i]-C[i] for i in range(3)]
    n=[u[1]*v[2]-u[2]*v[1], u[2]*v[0]-u[0]*v[2], u[0]*v[1]-u[1]*v[0]]
    f=lambda P: sum(n[i]*(P[i]-C[i]) for i in range(3))
    dirv=[E[i]-D[i] for i in range(3)]
    slope=sum(n[i]*dirv[i] for i in range(3))
    c0=f(D)
    if abs(slope) < 1e-12:
        return abs(c0) < 1e-12
    t = -c0/slope
    return (-1e-12 <= t <= 1+1e-12) if seg else True

for a in [-10, -19/3, -6, -4, -2, -1, 0, 4.4, 4.5, 4.6, 10]:
    ok(f"2(1) a={a}", meets(a, False) == (abs(a-4.5) > 1e-12))
for a in [-10, -19/3-0.01, -19/3, -6, -4, -2, -1.99, 0, 4.5, 10]:
    want = (-19/3 - 1e-9 <= a <= -2 + 1e-9)
    ok(f"2(2) a={a:.4f}", meets(a, True) == want)

# ── 大問3 ───────────────────────────────────────────────
def triples(n):
    """abc=n かつ どの2つも互いに素 な順序つきの組を全探索で数える。"""
    divs=[d for d in range(1,n+1) if n%d==0]
    out=[]
    for a in divs:
        for b in divs:
            if (a*b)>n or n%(a*b): continue
            c=n//(a*b)
            if math.gcd(a,b)==1 and math.gcd(a,c)==1 and math.gcd(b,c)==1: out.append((a,b,c))
    return out
def primes_upto(n): return [p for p in range(2,n+1) if all(p%q for q in range(2,int(p**0.5)+1))]

t120=triples(120)
sorted120=sorted({tuple(sorted(t)) for t in t120})
ok("3(1) 組", sorted120 == [(1,1,120),(1,3,40),(1,5,24),(1,8,15),(3,5,8)], str(sorted120))
for N in [2,3,4,5,6,7]:
    m=len(primes_upto(N)); f=math.factorial(N)
    tt=triples(f); uu=len({tuple(sorted(t)) for t in tt})
    ok(f"3(2) N={N}", len(tt)==3**m, f"全探索{len(tt)} 式{3**m}")
    ok(f"3(3) N={N}", uu==(3**m+3)//6, f"全探索{uu} 式{(3**m+3)//6}")

# ── 大問4 ───────────────────────────────────────────────
def P(n):
    """d が -1,0,1 に留まる確率を、状態ごとの厳密な分数で直接追う。"""
    st={0:Fraction(1)}
    for _ in range(n):
        nx={}
        for d,p in st.items():
            for step in (-1,0,1):
                e=d+step
                if -1<=e<=1: nx[e]=nx.get(e,0)+p*Fraction(1,3)
        st=nx
    return sum(st.values())
ok("4(1) P1", P(1)==Fraction(1), str(P(1)))
ok("4(1) P2", P(2)==Fraction(7,9), str(P(2)))
ok("4(1) P3", P(3)==Fraction(17,27), str(P(3)))
ok("4(3) 漸化式", all(P(n+2)==Fraction(2,3)*P(n+1)+Fraction(1,9)*P(n) for n in range(1,25)))
alpha=(1+math.sqrt(2))/3
ok("4(4) P_n <= α^(n-1)", all(float(P(n)) <= alpha**(n-1)+1e-15 for n in range(1,40)))
ok("4(4) α は特性方程式の解", abs(9*alpha**2-6*alpha-1) < 1e-12)
ok("4   P4=41/81", P(4)==Fraction(41,81), str(P(4)))

# 2次元の実際の歩きでも P を確かめる（d への読み替えが正しいか）
def P2d(n):
    st={(0,0):Fraction(1)}
    for _ in range(n):
        nx={}
        for (x,y),p in st.items():
            for (dx,dy) in ((1,0),(1,1),(0,1)):
                X,Y=x+dx,y+dy
                if -1<=Y-X<=1: nx[(X,Y)]=nx.get((X,Y),0)+p*Fraction(1,3)
        st=nx
    return sum(st.values())
ok("4   2次元の直接計算と一致", all(P(n)==P2d(n) for n in range(1,12)))

print()
print("解答の確認: すべて OK" if NG == 0 else f"解答の確認: 要確認 {NG} 件")
raise SystemExit(1 if NG else 0)
