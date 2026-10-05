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
    """シンプソン法。scipy を入れずに済ませるため、この1か所だけ自前で持つ。

    被積分関数が区間の内部で発散しないことは、呼ぶ側で保証する。
    """
    h = (hi - lo) / (n - 1)
    s = 0.0
    for i in range(n):
        x = lo + i * h
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


# ══ 名大理系 2025 ══════════════════════════════════════
print()
print("── 名大理系 2025 ──")

# 大問1 … g(x0) の式を、数値的に求めた最大値と突き合わせる
f  = lambda x: math.log((math.exp(x)+math.exp(-x))/2)
for c in [0.0, 0.5, -0.8, 0.95]:
    x0 = 0.5*math.log((1+c)/(1-c))
    g  = lambda x: c*x - f(x)
    # x0 のまわりを細かく見て、本当にそこが最大か
    xs = [x0 + (i-20000)/4000 for i in range(40001)]
    ok(f"1(3) x0 が最大点 c={c}", max(xs, key=g) == min([max(xs, key=g)], key=g) and abs(max(xs, key=g)-x0) < 1e-3,
       f"数値{max(xs, key=g):.6f} 式{x0:.6f}")
    want = 0.5*((1+c)*math.log(1+c) + (1-c)*math.log(1-c)) if abs(c) < 1 else None
    ok(f"1(3) g(x0) c={c}", abs(g(x0) - want) < 1e-12, f"直接{g(x0):.12f} 式{want:.12f}")
ok("1(2) a=-1,b=1", abs((math.exp(2*-50)-1)/(math.exp(2*-50)+1) + 1) < 1e-12
   and abs((1-math.exp(-2*50))/(1+math.exp(-2*50)) - 1) < 1e-12)

# 大問2 … a^2-b^2=c の組を全探索
def diffsq(c, amax=4000):
    return sorted((a, b) for a in range(amax+1) for b in range(a+1) if a*a-b*b == c)
ok("2(1) c=24", diffsq(24) == [(5,1),(7,5)], str(diffsq(24)))
ok("2(1) c=25", diffsq(25) == [(5,0),(13,12)], str(diffsq(25)))
ok("2(1) c=26", diffsq(26) == [], str(diffsq(26)))
for p_, n_ in [(3,1),(3,2),(5,1),(7,1),(5,2)]:
    c = 4*p_**(2*n_)
    want = sorted((p_**i + p_**(2*n_-i), p_**(2*n_-i) - p_**i) for i in range(n_+1))
    got = diffsq(c, amax=max(w[0] for w in want))
    ok(f"2(2) p={p_} n={n_}", got == want, f"全探索{got} 式{want}")

# 大問3 … 通過領域の面積・体積をモンテカルロ法で
import random
random.seed(20260101)
def area_mc(r, al, N=400000):
    lo, hi = -(1+r), (1+r)
    cnt = 0
    for _ in range(N):
        x = random.uniform(lo, hi); y = random.uniform(lo, hi)
        rho = math.hypot(x, y); ph = math.atan2(y, x)
        if 0 <= ph <= al:
            hit = abs(rho-1) <= r
        else:
            hit = min(math.hypot(x-1, y), math.hypot(x-math.cos(al), y-math.sin(al))) <= r
        cnt += hit
    return cnt/N * (hi-lo)**2
for r, al in [(0.3, math.pi/3), (0.7, 2*math.pi/3), (1.0, math.pi/2), (0.5, 0.0)]:
    want = 2*r*al + math.pi*r*r
    got = area_mc(r, al)
    ok(f"3(1) r={r} α={al:.4f}", abs(got-want) < 0.03*max(want,1), f"MC{got:.4f} 式{want:.4f}")

def vol_mc(R, al, N=400000):
    lo, hi = -(1+R), (1+R)
    cnt = 0
    for _ in range(N):
        x = random.uniform(lo, hi); y = random.uniform(lo, hi); z = random.uniform(-R, R)
        ph = math.atan2(y, x); rho = math.hypot(x, y)
        if 0 <= ph <= al:
            hit = (rho-1)**2 + z*z <= R*R
        else:
            hit = min((x-1)**2+y*y+z*z, (x-math.cos(al))**2+(y-math.sin(al))**2+z*z) <= R*R
        cnt += hit
    return cnt/N * (hi-lo)**2 * (2*R)
for R, al in [(0.4, math.pi/3), (0.8, 2*math.pi/3), (1.0, math.pi/2), (0.6, 0.0)]:
    want = math.pi*R*R*al + 4/3*math.pi*R**3
    got = vol_mc(R, al)
    ok(f"3(2) R={R} α={al:.4f}", abs(got-want) < 0.04*max(want,1), f"MC{got:.4f} 式{want:.4f}")

# 大問4 … 6^n 通りの操作列を全探索
NB = {1:(2,4), 2:(1,3,5), 3:(2,6), 4:(1,5), 5:(2,4,6), 6:(3,5)}
def p_coins(n):
    from itertools import product
    good = 0
    for seq in product(range(1,7), repeat=n):
        st = [0]*7
        for c in seq:
            for j in NB[c]: st[j] ^= 1
        if all(st[j] == 1 for j in range(1,7)): good += 1
    return Fraction(good, 6**n)
ok("4(1) p2=1/18", p_coins(2) == Fraction(1,18), str(p_coins(2)))
ok("4(3) p4=7/162", p_coins(4) == Fraction(7,162), str(p_coins(4)))
ok("4   n が奇数なら 0", p_coins(1) == 0 and p_coins(3) == 0)
# (2) のグループ分けが唯一解か（偶奇の連立を全探索）
sols = []
for bits in range(64):
    x = [(bits >> i) & 1 for i in range(6)]
    if all(sum(x[j-1] for j in NB[i]) % 2 == 1 for i in range(1,7)): sols.append(tuple(x))
ok("4(2) A={2,5} が唯一解", sols == [(0,1,0,0,1,0)], str(sols))

# ══ 東大文系 2026 ══════════════════════════════════════
print()
print("── 東大文系 2026 ──")
from itertools import combinations

# 大問1 … 面積を数値積分し S=4d/3 と突き合わせる
for d in [math.sqrt(3), 2.0, 2.5, 3.0]:
    k_ = 1/d**2; al, be = -3-d, -3+d
    S_num = quad(lambda x: k_*(x-al)*(be-x), al, be)[0]
    ok(f"1 面積 d={d:.4f}", abs(S_num - 4*d/3) < 1e-5, f"数値{S_num:.6f} 式{4*d/3:.6f}")
    yint = 1 - 9/d**2
    ok(f"1 y切片 d={d:.4f}", -2-1e-12 <= yint <= 1e-12, f"{yint:.6f}")
ok("1 S の下端", abs(4*math.sqrt(3)/3 - 2.3094010767) < 1e-9)

# 大問2 … 格子点から3点を選んで三角形になる確率を全探索
def p_tri(n):
    pts = [(x, y) for x in (1, 2, 3) for y in range(1, n+1)]
    tot = 0; tri = 0
    for a, b, c in combinations(pts, 3):
        tot += 1
        area2 = (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0])
        if area2 != 0: tri += 1
    return Fraction(tri, tot)
ok("2(1) p5=412/455", p_tri(5) == Fraction(412, 455), str(p_tri(5)))
for m_ in [1, 2, 3, 4]:
    want = Fraction(m_*(16*m_-7), (6*m_-1)*(3*m_-1))
    ok(f"2(2) m={m_}", p_tri(2*m_) == want, f"全探索{p_tri(2*m_)} 式{want}")

# 大問3 … f>g と共有点の個数を数値で
def g(x):
    n = math.floor(x/2)
    return x - 2*n if x < 2*n+1 else -x + 2*n+2
def f_(x, a): return a/8*(x-1)**2 + 2/a - 3
bad = [(a, x) for a in [0.05*i for i in range(1, 20)]
              for x in [4 + 0.001*j for j in range(0, 6000)]
              if f_(x, a) <= g(x)]
ok("3(1) x>=4 で f>g", not bad, f"反例 {bad[:2]}")
def n_cross(a):
    cnt = 0; prev = f_(0, a) - g(0)
    N = 400000
    for i in range(1, N+1):
        x = 4*i/N
        cur = f_(x, a) - g(x)
        if prev == 0 or (prev < 0) != (cur < 0): cnt += 1
        prev = cur
    return cnt
A = 4 - 2*math.sqrt(3)
ok("3(2) a<4-2√3 は2個", n_cross(0.51) == 2 and n_cross(0.52) == 2, f"{n_cross(0.51)},{n_cross(0.52)}")
ok("3(2) a>4-2√3 は4個", n_cross(0.60) == 4 and n_cross(0.66) == 4, f"{n_cross(0.60)},{n_cross(0.66)}")
ok("3(2) 境界 a=4-2√3", abs(f_(3, A) - 1) < 1e-12, f"f(3)-1={f_(3,A)-1:.2e}")
ok("3(2) 境界は範囲内", 0.5 < A < 2/3, f"{A:.6f}")

# 大問4 … 接線の傾き・面積を直に計算
def tangents(k_):
    t = -k_
    m1 = (t + math.sqrt(3))/(1 - math.sqrt(3)*t)
    m2 = (t - math.sqrt(3))/(1 + math.sqrt(3)*t)
    return t, m1, m2
for k_ in [0.6, 0.7217, 1.0, 2.0]:
    t, m1, m2 = tangents(k_)
    angs = [math.atan(m) for m in (t, m1, m2)]
    diffs = sorted(abs((angs[i]-angs[j]) % math.pi) for i, j in [(0,1),(1,2),(0,2)])
    good = all(abs(min(d, math.pi-d) - math.pi/3) < 1e-9 for d in diffs)
    ok(f"4(2) なす角60° k={k_}", good)
    ok(f"4(2) p,q が実在 k={k_}", (m1-t) > 0 and (m2-t) > 0)
for k_ in [0.5, 0.57]:
    t, m1, m2 = tangents(k_)
    ok(f"4(2) k={k_} は範囲外", not ((m1-t) > 0 and (m2-t) > 0))
def areas(k_):
    t, m1, m2 = tangents(k_)
    p0 = math.sqrt((m1-t)/3); q0 = math.sqrt((m2-t)/3)
    out = []
    for sp in (1, -1):
        for sq in (1, -1):
            p, q = sp*p0, sq*q0
            ms = [-k_, 3*p*p-k_, 3*q*q-k_]; cs = [0.0, -2*p**3, -2*q**3]
            num = cs[0]*(ms[1]-ms[2]) + cs[1]*(ms[2]-ms[0]) + cs[2]*(ms[0]-ms[1])
            den = (ms[0]-ms[1])*(ms[1]-ms[2])*(ms[2]-ms[0])
            out.append(0.5*num*num/abs(den))
    return sorted(set(round(v, 9) for v in out))
K = 5*math.sqrt(3)/12
a4 = areas(K)
ok("4(3) 面積は2値", len(a4) == 2, str(a4))
ok("4(3) M=4m", abs(a4[1]/a4[0] - 4) < 1e-7, f"比 {a4[1]/a4[0]:.9f}")
ok("4(3) k が (2) の範囲内", K > math.sqrt(3)/3, f"k={K:.6f}")
for k_ in [0.65, 0.8]:
    r = areas(k_)
    ok(f"4(3) k={k_} では M/4m≠1", abs(r[1]/r[0] - 4) > 1e-3, f"比 {r[1]/r[0]:.4f}")

print()
print("解答の確認: すべて OK" if NG == 0 else f"解答の確認: 要確認 {NG} 件")
raise SystemExit(1 if NG else 0)
