"""掲載した解答を、数式変形とは別の道（数値積分・全探索）で確かめる。

`npm run check:solutions` で実行する。解説を足したら、その大問の確認もここに足す。
「自分の式変形をもう一度たどる」のではなく、**別の方法で同じ答えに着く**ことを見る。
  ・大問1 … 面積を数値積分で、最小値を細かい刻みの全探索で
  ・大問2 … 平面と直線の交わりを、法線を外積で取り直して連立で
  ・大問3 … 積が N! になる組を全探索で数え上げ
  ・大問4 … 確率を分数のまま直接追い、2次元の歩きそのものでも確かめる

模試の見本問題（assets/moshi-sample/moshi-sample.tex）も、ここで同じように確かめる。
公開する以上、解説と同じ基準で確かめておく。
"""
import bisect
import cmath
import random
import itertools
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

# ══ 名大文系 2026 ══════════════════════════════════════
print()
print("── 名大文系 2026 ──")
# 第2問・第3問は理科系と同じ問題なので、上の確認がそのまま効く。ここは第1問だけ。
def tan_theta(p_, a_):
    """ベクトルから直に tanθ を出す（式変形とは別経路）。"""
    sp = math.sqrt(p_)
    b, c = a_ - sp, a_ + sp
    AB = (b - a_, b*b + p_ - a_*a_)
    AC = (c - a_, c*c + p_ - a_*a_)
    dot = AB[0]*AC[0] + AB[1]*AC[1]
    crs = AB[0]*AC[1] - AB[1]*AC[0]
    return abs(crs)/dot if dot != 0 else float("inf"), dot
for p_ in [0.2, 0.75, 1.0, 3.0]:
    for a_ in [-2.0, -0.5, 0.0, 1.3]:
        got, dot = tan_theta(p_, a_)
        den = 4*p_ - 4*a_*a_ - 1
        want = 4*math.sqrt(p_)/den if den != 0 else float("inf")
        ok(f"1(3) p={p_} a={a_}", abs(got - want) < 1e-9 or (math.isinf(got) and math.isinf(want)),
           f"直接{got:.9f} 式{want:.9f}")
for a_ in [-1.5, 0.0, 0.7]:
    p_ = a_*a_ + 0.25
    _, dot = tan_theta(p_, a_)
    ok(f"1(2) a={a_} で直角", abs(dot) < 1e-12, f"内積{dot:.2e}")
def min_theta(p_):
    best = math.pi
    for i in range(-4000, 4001):
        a_ = i/500
        sp = math.sqrt(p_)
        b, c = a_ - sp, a_ + sp
        AB = (b - a_, b*b + p_ - a_*a_); AC = (c - a_, c*c + p_ - a_*a_)
        dot = AB[0]*AC[0] + AB[1]*AC[1]
        crs = abs(AB[0]*AC[1] - AB[1]*AC[0])
        best = min(best, math.atan2(crs, dot))
    return best
for p_ in [0.1, 0.5, 0.75]:
    ok(f"1(4) p={p_} は条件を満たす", min_theta(p_) >= math.pi/3 - 1e-9, f"min θ={math.degrees(min_theta(p_)):.3f}°")
for p_ in [0.76, 1.0, 2.0]:
    ok(f"1(4) p={p_} は条件を外れる", min_theta(p_) < math.pi/3 - 1e-6, f"min θ={math.degrees(min_theta(p_)):.3f}°")
ok("1(4) p=3/4 で等号", abs(min_theta(0.75) - math.pi/3) < 1e-6, f"{math.degrees(min_theta(0.75)):.6f}°")

# ══ 東北大文系 2026 ══════════════════════════════════════
print()
print("── 東北大文系 2026 ──")

# 大問1 … 接点を数値で求め、垂直二等分線の y 切片を直に計算
def q_direct(u):
    d = math.sqrt(u*u - u + 1)
    t1, t2 = u - d, u + d
    mx, my = (t1+t2)/2, (t1*t1 + t2*t2)/2
    slope = t1 + t2                 # P1P2 の傾き
    return my + mx/slope            # x=0 での y（垂直二等分線の傾きは -1/slope）
for u in [0.05, 0.25, 1.0, 3.0]:
    ok(f"1(2) q(u) u={u}", abs(q_direct(u) - (2*u*u - u + 1.5)) < 1e-9,
       f"直接{q_direct(u):.9f} 式{2*u*u-u+1.5:.9f}")
grid = [i/20000 for i in range(1, 200001)]
umin = min(grid, key=q_direct)
ok("1(2) 最小を与える u", abs(umin - 0.25) < 1e-3, f"全探索{umin:.5f} 式0.25")
ok("1(2) 最小値 11/8", abs(q_direct(0.25) - 11/8) < 1e-12, f"{q_direct(0.25):.12f}")

# 大問2 … a^2+2b^2=c^2 の解を全探索して性質を確かめる
sols = [(a, b, c) for c in range(1, 401) for a in range(1, c) for b in range(1, c)
        if a*a + 2*b*b == c*c]
ok("2 解の個数", len(sols) > 100, f"{len(sols)} 組")
ok("2(3) a+c が偶数", all((a+c) % 2 == 0 for a, b, c in sols))
ok("2(3) b が偶数", all(b % 2 == 0 for a, b, c in sols))
ok("2(3) a,c 偶数なら b は4の倍数",
   all(b % 4 == 0 for a, b, c in sols if a % 2 == 0 and c % 2 == 0),
   f"対象 {sum(1 for a,b,c in sols if a%2==0 and c%2==0)} 組")
ok("2(1) (1,2,3)", 1 + 2*4 == 9)

# 大問3 … 座標に落として交点 F を数値で求める
A = (math.sqrt(2), 0.0)
B = (1/math.sqrt(2), math.sqrt(5 - 0.5))
ok("3 前提 |a|,|b|,a·b", abs(math.hypot(*A)-math.sqrt(2)) < 1e-12
   and abs(math.hypot(*B)-math.sqrt(5)) < 1e-12
   and abs(A[0]*B[0]+A[1]*B[1]-1) < 1e-12)
def F_num(s_):
    t_ = (1-2*s_)/(5-s_)
    D = (s_*A[0], s_*A[1]); E = (t_*B[0], t_*B[1])
    # AE と BD の交点
    d1 = (E[0]-A[0], E[1]-A[1]); d2 = (D[0]-B[0], D[1]-B[1])
    det = d1[0]*(-d2[1]) - d1[1]*(-d2[0])
    rhs = (B[0]-A[0], B[1]-A[1])
    al = (rhs[0]*(-d2[1]) - rhs[1]*(-d2[0]))/det
    return (A[0]+al*d1[0], A[1]+al*d1[1]), (d1[0]*d2[0]+d1[1]*d2[1])
for s_ in [0.05, 0.25, 0.4, 0.49]:
    Fn, perp = F_num(s_)
    K = 2*s_*s_ - 2*s_ + 5
    ca, cb = s_*(s_+4)/K, (1-s_)*(1-2*s_)/K
    Ff = (ca*A[0]+cb*B[0], ca*A[1]+cb*B[1])
    ok(f"3(1) 直交 s={s_}", abs(perp) < 1e-9, f"内積{perp:.2e}")
    ok(f"3(2) OF s={s_}", abs(Fn[0]-Ff[0]) < 1e-9 and abs(Fn[1]-Ff[1]) < 1e-9,
       f"数値({Fn[0]:.6f},{Fn[1]:.6f}) 式({Ff[0]:.6f},{Ff[1]:.6f})")
s7 = 2/7
K = 2*s7*s7 - 2*s7 + 5
ca, cb = s7*(s7+4)/K, (1-s7)*(1-2*s7)/K
Ff = (ca*A[0]+cb*B[0], ca*A[1]+cb*B[1])
dot = Ff[0]*(B[0]-A[0]) + Ff[1]*(B[1]-A[1])
ok("3(3) s=2/7 で OF⊥AB", abs(dot) < 1e-12, f"内積{dot:.2e}")
ok("3(3) s=2/7 は範囲内", 0 < s7 < 0.5)

# 大問4 … 面積を数値積分して比を確かめる
f4 = lambda x: x**4 - x*x
S4 = quad(lambda x: (x*x - 0.5)**2, -1/math.sqrt(2), 1/math.sqrt(2))[0]
ok("4(3) S=2√2/15", abs(S4 - 2*math.sqrt(2)/15) < 1e-9, f"数値{S4:.10f} 式{2*math.sqrt(2)/15:.10f}")
for k_ in [0.01, 0.1, 1.0, 5.0, 50.0]:
    al = math.sqrt((1+math.sqrt(1+4*k_))/2)
    T4 = quad(lambda x: k_ + x*x - x**4, -al, al)[0]
    want = 8/5*al**5 - 4/3*al**3
    ok(f"4(3) T k={k_}", abs(T4 - want) < 1e-6*max(1, abs(want)), f"数値{T4:.8f} 式{want:.8f}")
    ok(f"4(3) T/S>√2 k={k_}", T4/S4 > math.sqrt(2), f"比{T4/S4:.6f}")
al0 = math.sqrt((1+math.sqrt(1+4*1e-9))/2)
T0 = 8/5*al0**5 - 4/3*al0**3
ok("4(3) k→0 で √2 に近づく", abs(T0/S4 - math.sqrt(2)) < 1e-6, f"比{T0/S4:.9f}")

# ══ 京大文系 2026 ══════════════════════════════════════
print()
print("── 京大文系 2026 ──")
from itertools import combinations as comb

# 大問1 … 面積を数値積分で
def area_kyo(t):
    a = math.sqrt(1 - t*t)
    # t x^2 - a x + (1-2t) = 0 の解
    D = a*a - 4*t*(1-2*t)
    x1 = (a - math.sqrt(D))/(2*t); x2 = (a + math.sqrt(D))/(2*t)
    return quad(lambda x: (2 - x*x) - (1 - a*x)/t, x1, x2)[0], (7*t*t-4*t+1)**1.5/(6*t**3)
for t in [0.2, 0.5, 0.8, 0.95]:
    num, fml = area_kyo(t)
    ok(f"1 面積 t={t}", abs(num - fml) < 1e-6*max(1, fml), f"数値{num:.8f} 式{fml:.8f}")
S_of = lambda t: (7*t*t-4*t+1)**1.5/(6*t**3)
tmin = min([i/100000 for i in range(1, 100000)], key=S_of)
ok("1 最小を与える t", abs(tmin - 0.5) < 1e-4, f"全探索{tmin:.5f} 式0.5")
ok("1 最小値 √3/2", abs(S_of(0.5) - math.sqrt(3)/2) < 1e-12, f"{S_of(0.5):.12f}")

# 大問2 … 正四面体を座標に取り、距離の式と結論を確かめる
O=(0,0,0); A=(1,0,0); B=(0.5, math.sqrt(3)/2, 0); C=(0.5, math.sqrt(3)/6, math.sqrt(6)/3)
edges = [(O,A),(O,B),(O,C),(A,B),(A,C),(B,C)]
ok("2 正四面体", all(abs(math.dist(p_, q_) - 1) < 1e-12 for p_, q_ in edges))
def dist2(s_, w_):
    P = (s_, 0, 0)
    Q = tuple(B[i] + w_*(C[i]-B[i]) for i in range(3))
    return sum((P[i]-Q[i])**2 for i in range(3))
for s_ in [0.0, 0.3, 0.5, 1.0]:
    for w_ in [0.0, 0.25, 0.5, 1.0]:
        want = (s_-0.5)**2 + (w_-0.5)**2 + 0.5
        ok(f"2 距離の式 s={s_} w={w_}", abs(dist2(s_, w_) - want) < 1e-12)
def meets_any(r):
    """ある P で球面が辺 BC と共有点をもつか。"""
    for i in range(0, 201):
        s_ = i/200
        lo = math.sqrt((s_-0.5)**2 + 0.5); hi = math.sqrt((s_-0.5)**2 + 0.75)
        if lo <= r <= hi: return True
    return False
for r in [0.1, 0.5, 0.70, 1.01, 2.0]:
    ok(f"2 r={r} は共有点なし", not meets_any(r))
for r in [0.71, 0.8, 0.95, 1.0]:
    ok(f"2 r={r} は共有点あり", meets_any(r))
ok("2 境界 √2/2", abs(math.sqrt(2)/2 - 0.7071067812) < 1e-9)

# 大問3 … 3m+pk で表せない数を全探索
def unrep(p_):
    lim = 4*p_
    rep = set()
    for m_ in range(0, lim//3 + 2):
        for k_ in range(0, lim//p_ + 2):
            v = 3*m_ + p_*k_
            if v <= lim: rep.add(v)
    return [n for n in range(0, lim+1) if n not in rep]
for p_ in [5, 7, 11, 13, 17, 19, 23]:
    u = unrep(p_)
    ok(f"3(2) p={p_}", len(u) == p_ - 1, f"全探索{len(u)} 式{p_-1}")
    ok(f"3(1) p={p_} 2p以上は表せる", all(n < 2*p_ for n in u), f"最大{max(u)} < 2p={2*p_}")

# 大問4 … ガウス記号の和を直接計算
a_direct = lambda n: sum(math.floor(math.log(k, 3) + 1e-12) for k in range(1, n+1))
ok("4(1) a26=42", a_direct(26) == 42, str(a_direct(26)))
for N_ in range(1, 9):
    m_ = 3**N_ - 1
    want = ((2*N_-3)*3**N_ + 3)//2
    ok(f"4(2) N={N_}", a_direct(m_) == want, f"直接{a_direct(m_)} 式{want}")

# 大問5 … 期待値を全組合せで
for n_ in list(range(3, 15)) + [25, 40]:
    tot = list(comb(range(1, n_+1), 3))
    e = Fraction(sum(max(c) for c in tot), len(tot))
    ok(f"5 n={n_}", e == Fraction(3*(n_+1), 4), f"全探索{e} 式{Fraction(3*(n_+1),4)}")

# ══ 東大理系 2026 ══════════════════════════════════════
print()
print("── 東大理系 2026 ──")
# 第2問・第4問は文科と同じ問題なので、上の確認がそのまま効く。

# 大問1
f1 = lambda th: math.sin(th) - th + th**3/6
M1 = math.sin(1) - 5/6
ok("1(1) M=sin1-5/6", abs(f1(1) - M1) < 1e-15, f"{M1:.10f}")
ok("1(1) m=-M", abs(f1(-1) + M1) < 1e-15)
ok("1(1) f は [-1,1] で増加",
   all(f1(-1+2*i/20000) < f1(-1+2*(i+1)/20000) for i in range(20000)))
I1 = quad(lambda x: math.sin(math.cos(x) - x), 0, 2*math.pi)[0]
lo1, hi1 = 7/8*math.pi, 7/8*math.pi + 4*M1
ok("1(2) 不等式", lo1 <= I1 <= hi1, f"{lo1:.6f} <= {I1:.6f} <= {hi1:.6f}")
I1b = quad(lambda x: math.sin(math.cos(x))*math.cos(x), 0, 2*math.pi)[0]
ok("1(2) sin x の項は消える", abs(I1 - I1b) < 1e-6, f"{I1:.8f} vs {I1b:.8f}")
ok("1(2) 多項式部分が 7π/8",
   abs(quad(lambda x: math.cos(x)**2 - math.cos(x)**4/6, 0, 2*math.pi)[0] - 7/8*math.pi) < 1e-6)

# 大問3 … 弦を多数引いて通過領域を数値で確かめる
import random
random.seed(7)
def on_chord(x, y):
    """(x,y) が通過領域に入るかを、M を細かく動かして直に判定。"""
    if x*x + y*y > 25 + 1e-9: return False
    for i in range(3000):
        ph = 2*math.pi*i/3000
        u, v = 3 + 2*math.cos(ph), 2*math.sin(ph)
        if abs(u - 5) < 1e-9 and abs(v) < 1e-9: continue
        if abs(x*u + y*v - (u*u + v*v)) < 2e-2: return True
    return False
def by_formula(x, y):
    return x*x + y*y <= 25 and 5*(x-3)**2 - 4*y*y <= 20
agree = dis = 0
for _ in range(1500):
    x = random.uniform(-6, 7); y = random.uniform(-6, 6)
    if abs(5*(x-3)**2 - 4*y*y - 20) < 0.6: continue   # 境界の近くは数値誤差で揺れる
    if abs(x*x + y*y - 25) < 0.6: continue
    if on_chord(x, y) == by_formula(x, y): agree += 1
    else: dis += 1
ok("3(2) 領域の式", dis == 0, f"一致{agree} 不一致{dis}")
ok("3(1) 中点の円", all(
    abs((3+2*math.cos(t)-3)**2 + (2*math.sin(t))**2 - 4) < 1e-12 for t in [0, 1, 2, 3]))

# 大問5
b5 = math.asin(1/3)
ok("5(1) sin3β=23/27", abs(math.sin(3*b5) - 23/27) < 1e-12, f"{math.sin(3*b5):.12f}")
ok("5(1) 3β<π/2", 3*b5 < math.pi/2, f"3β={3*b5:.6f}")
vals = [math.sin(3*math.atan2(math.sin(t), math.cos(t)+3)) for t in [2*math.pi*i/20000 for i in range(20000)]]
ok("5(1) 数値の範囲", abs(max(vals) - 23/27) < 1e-6 and abs(min(vals) + 23/27) < 1e-6,
   f"[{min(vals):.6f}, {max(vals):.6f}]")
def ok5(cx, cy):
    """中心 c=(cx,cy) の単位円が、60度おきの6本の半直線の隣り合う2本と交わるか。"""
    rho = math.hypot(cx, cy)
    if rho <= 1: return True
    d = math.asin(min(1.0, 1/rho)); ps = math.atan2(cy, cx)
    hit = [k for k in range(6) if abs(((ps - k*math.pi/3 + math.pi) % (2*math.pi)) - math.pi) <= d]
    return any(((a - b) % 6) in (1, 5) for a in hit for b in hit)
N5, cnt = 1200, 0
for i in range(N5):
    for j in range(N5):
        x = -2.5 + 5*(i+0.5)/N5; y = -2.5 + 5*(j+0.5)/N5
        if ok5(x, y): cnt += 1
area5 = cnt * (5/N5)**2
ok("5(2) 面積 4√3", abs(area5 - 4*math.sqrt(3)) < 0.02, f"数え上げ{area5:.5f} 式{4*math.sqrt(3):.5f}")

# 大問6
def fg(n):
    f_ = g_ = 0
    for d in range(1, n+1):
        if n % d == 0:
            if d % 3 == 1: f_ += 1
            elif d % 3 == 2: g_ += 1
    return f_, g_
ok("6(1) f,g(2800)", fg(2800) == (16, 14), str(fg(2800)))
def fg_fast(n):
    f_ = g_ = 0
    d = 1
    while d*d <= n:
        if n % d == 0:
            for q in {d, n//d}:
                if q % 3 == 1: f_ += 1
                elif q % 3 == 2: g_ += 1
        d += 1
    return f_, g_
ok("6(2) f>=g (n<=200000)", all(fg_fast(n)[0] >= fg_fast(n)[1] for n in range(1, 200001)))
found = set()
for n in range(1, 400001):
    f_, g_ = fg_fast(n)
    if g_ == 15: found.add(f_)
ok("6(3) 見つかった f は答えの中", found <= {15, 16, 18, 20, 30}, f"{sorted(found)}")
# f=16 と f=30 は n が大きく（2^30、7^14*4）全探索には出てこないので、直に作って確かめる
ok("6(3) m=2^30 で f=16,g=15", fg_fast(2**30) == (16, 15), str(fg_fast(2**30)))
ok("6(3) m=7^14*2^2 で f=30,g=15", fg_fast(7**14 * 4) == (30, 15), str(fg_fast(7**14 * 4)))

# ══ 九大理系 2026 ══════════════════════════════════════
print()
print("── 九大理系 2026 ──")
from itertools import product as iproduct

# 大問1 … 球・円柱の式を座標で直に確かめる
u1 = (0.5, 0.0, math.sqrt(3)/2)
c1 = (math.sqrt(2), 0.0, math.sqrt(6))
ok("1(1) 中心は球面上", abs(sum(v*v for v in c1) - 8) < 1e-12, f"|c|^2={sum(v*v for v in c1):.12f}")
ok("1(1) 中心は OP 上", all(abs(c1[i] - 2*math.sqrt(2)*u1[i]) < 1e-12 for i in range(3)))
ok("1(1) 切り口の半径1", abs(math.sqrt(9 - 8) - 1) < 1e-12)
def cyl(x, y, z):
    return x*x + y*y + z*z - (x/2 + math.sqrt(3)/2*z)**2
# 側面上の点（中心から垂直に1）
perp = (math.sqrt(3)/2, 0.0, -0.5)
for th in [0, 1.0, 2.5]:
    e2 = (0.0, 1.0, 0.0)
    P = tuple(c1[i] + math.cos(th)*perp[i] + math.sin(th)*e2[i] for i in range(3))
    ok(f"1(2) 側面の式 θ={th}", abs(cyl(*P) - 1) < 1e-12, f"{cyl(*P):.12f}")
for xx in [-1.0, 0.0, 0.8]:
    yy = math.sqrt(max(0.0, 1 - 0.75*xx*xx))
    ok(f"1(2) z=0 の切り口 x={xx}", abs(cyl(xx, yy, 0.0) - 1) < 1e-12)

# 大問2
t1k, t2k = (math.sqrt(3)-1)/2, (math.sqrt(3)+1)/2
ok("2(1) t1*t2=1/2", abs(t1k*t2k - 0.5) < 1e-15)
for t in [t1k, 0.5, 1/math.sqrt(2), 1.0, t2k]:
    X = t + 1/(2*t); Y = t - 1/(2*t)
    ok(f"2(1) X^2-Y^2=2 t={t:.4f}", abs(X*X - Y*Y - 2) < 1e-12)
ok("2(1) 端で Y=±1", abs((t1k - 1/(2*t1k)) + 1) < 1e-12 and abs((t2k - 1/(2*t2k)) - 1) < 1e-12)
ok("2(1) 端で X=√3", abs((t1k + 1/(2*t1k)) - math.sqrt(3)) < 1e-12)
V2 = quad(lambda y: math.pi*((2 + y*y) - 3*y*y), -1, 1)[0]
ok("2(2) 体積 8π/3", abs(V2 - 8*math.pi/3) < 1e-9, f"数値{V2:.9f} 式{8*math.pi/3:.9f}")

# 大問3 … 硬貨の投げ方を木で全部たどって数え上げる
def p_balls(n, r):
    """n, n+1, n+2 番目の玉がすべて黒である確率。

    「必要な個数の玉が出そろった時点で止める」ので、投げ方は木の葉と1対1になる。
    長さを固定して列挙すると、同じ前半を何度も数えてしまうので注意。
    """
    need = n + 2
    tot = Fraction(0)

    def rec(balls, pr):
        nonlocal tot
        if len(balls) >= need:
            if balls[n-1] == balls[n] == balls[n+1] == "B":
                tot += pr
            return
        rec(balls + ["W", "W"], pr * r)        # 表
        rec(balls + ["B"], pr * (1 - r))       # 裏

    rec([], Fraction(1))
    return tot

for rr in [Fraction(3,10), Fraction(1,2), Fraction(7,10)]:
    # 葉の確率の合計が 1 になること（数え漏れ・重複がないことの確認）
    tot_check = Fraction(0)
    def leaves(balls, pr, need=6):
        global tot_check
        if len(balls) >= need:
            tot_check += pr; return
        leaves(balls + ["W","W"], pr*rr); leaves(balls + ["B"], pr*(1-rr))
    tot_check = Fraction(0); leaves([], Fraction(1))
    ok(f"3 木の確率の合計が1 r={rr}", tot_check == 1, str(tot_check))
    for n in range(1, 9):
        want = (1-rr)**3 * (1 - (-rr)**n) / (1 + rr)
        got = p_balls(n, rr)
        ok(f"3(4) r={rr} n={n}", got == want, f"全列挙{got} 式{want}")
    ok(f"3(1) r={rr} p1", p_balls(1, rr) == (1-rr)**3)
    ok(f"3(1) r={rr} p2", p_balls(2, rr) == (1-rr)**4)
    ok(f"3(3) 漸化式 r={rr}",
       all(p_balls(n, rr) == (1-rr)*p_balls(n-1, rr) + rr*p_balls(n-2, rr) for n in range(3, 9)))

# 大問4
a4 = math.sqrt(2) + math.sqrt(3)
ok("4(1) 二重根号", abs(a4 - math.sqrt(5 + 2*math.sqrt(6))) < 1e-14)
ok("4(2) α は根", abs(a4**4 - 10*a4**2 + 1) < 1e-10, f"{a4**4-10*a4**2+1:.2e}")
roots4 = [math.sqrt(2)+math.sqrt(3), -math.sqrt(2)-math.sqrt(3), math.sqrt(3)-math.sqrt(2), math.sqrt(2)-math.sqrt(3)]
ok("4(2) 4解すべて根", all(abs(x**4 - 10*x**2 + 1) < 1e-10 for x in roots4))
ok("4(2) 解の和0・積1", abs(sum(roots4)) < 1e-12 and abs(math.prod(roots4) - 1) < 1e-10)
ok("4(3) p^2=12,8 は有理数の平方でない",
   all(abs(math.isqrt(v)**2 - v) > 0 for v in (12, 8)))

# 大問5
g5 = lambda t: math.log(4*t*t + 1)
f5 = lambda x: quad(g5, x, x+1, n=20001)[0]
ok("5(1) 極小値", abs(f5(-0.5) - (math.log(2) + math.pi/2 - 2)) < 1e-7,
   f"数値{f5(-0.5):.9f} 式{math.log(2)+math.pi/2-2:.9f}")
grid5 = [-2 + 4*i/4000 for i in range(4001)]
ok("5(1) 最小を与える x", abs(min(grid5, key=f5) + 0.5) < 2e-3, f"{min(grid5, key=f5):.5f}")
for X in [50.0, 200.0, 1000.0]:
    v = X*(f5(X) - f5(X-1))
    ok(f"5(2) x={X:.0f}", abs(v - 2) < 0.02, f"{v:.6f}")

# ══ 東京科学大 2026 ══════════════════════════════════════
print()
print("── 東京科学大 2026 ──")
import cmath
from fractions import Fraction as Fr

# 大問1
for a_, b_, n_ in [(Fr(1),Fr(1),2), (Fr(-3,2),Fr(2,5),7), (Fr(0),Fr(1),3)]:
    x = float(a_) + float(b_)*math.sqrt(n_)
    p_, q_ = -2*float(a_), float(a_)**2 - float(b_)**2*n_
    ok(f"1(1) a={a_} b={b_} n={n_}", abs(x*x + p_*x + q_) < 1e-9, f"{x*x+p_*x+q_:.2e}")
    y = float(a_) + float(b_)*(n_ ** (1/3))
    P_, Q_, R_ = -3*float(a_), 3*float(a_)**2, -(float(a_)**3 + float(b_)**3*n_)
    ok(f"1(2) a={a_} b={b_} n={n_}", abs(y**3 + P_*y*y + Q_*y + R_) < 1e-9, f"{y**3+P_*y*y+Q_*y+R_:.2e}")

# 大問2
def count_lt(n_):
    return sum(1 for x in range(1, n_) for y in range(1, n_) for z in range(1, n_) if x+y+z < n_)
def count_eq(n_):
    N = 3*n_
    return sum(1 for x in range(1, N) for y in range(x+1, N) if 0 < N - x - y and N - x - y > y)
for n_ in range(4, 41):
    ok(f"2(2) n={n_}", count_lt(n_) == math.comb(n_-1, 3), f"全探索{count_lt(n_)} 式{math.comb(n_-1,3)}") if n_ <= 20 else None
    want = (3*n_*n_ - 6*n_ + 4)//4 if n_ % 2 == 0 else 3*(n_-1)**2//4
    ok(f"2(3) n={n_}", count_eq(n_) == want, f"全探索{count_eq(n_)} 式{want}") if n_ <= 20 else None
ok("2(2) n=40", count_lt(40) == math.comb(39, 3))
ok("2(3) n=40", count_eq(40) == (3*1600 - 240 + 4)//4)

# 大問3
def q3(a_, b_):
    P = (3*a_/4, b_/4)
    Q = ((a_*a_ - b_*b_)/(4*a_), b_/2)
    return P, Q
for a_, b_ in [(1.0,1.0), (1.0,2.0), (2.0,0.5), (1.0,math.sqrt(2))]:
    P, Q = q3(a_, b_)
    for nm, O in [("O",(0,0)), ("B",(0,b_)), ("C",(a_/2,b_/2))]:
        pass
    d = [math.dist(Q, X) for X in [(0,0), (0,b_), (a_/2, b_/2)]]
    ok(f"3(1) 外心 a={a_} b={b_}", max(d) - min(d) < 1e-12, f"{d}")
    for t in [a_/4, (3*a_*a_ - b_*b_)/(4*a_)]:
        RP = (P[0]-t, P[1]); RQ = (Q[0]-t, Q[1])
        ok(f"3(2) 直交 a={a_} b={b_} t={t:.4f}", abs(RP[0]*RQ[0] + RP[1]*RQ[1]) < 1e-12)
    t = a_/4
    RP = (P[0]-t, P[1]); RQ = (Q[0]-t, Q[1])
    ratio = math.hypot(*RQ)/math.hypot(*RP)
    ok(f"3(3) 比=b/a a={a_} b={b_}", abs(ratio - b_/a_) < 1e-12, f"{ratio:.9f} vs {b_/a_:.9f}")
    t2 = (3*a_*a_ - b_*b_)/(4*a_)
    if abs(t2 - a_/4) > 1e-9:
        RP2 = (P[0]-t2, P[1]); RQ2 = (Q[0]-t2, Q[1])
        r2 = math.hypot(*RQ2)/math.hypot(*RP2)
        ok(f"3(3) もう一方は不一致 a={a_} b={b_}",
           abs(r2 - b_/a_) > 1e-9 and abs(1/r2 - b_/a_) > 1e-9, f"{r2:.6f}")

# 大問4
e_ = lambda th: cmath.exp(1j*th)
def Rn(n_, z):
    return e_(2*(n_+1)*math.pi/3)*z.conjugate() + math.sqrt(3)*e_((2*n_-1)*math.pi/6)
for n_ in range(1, 9):
    p_ = e_((n_-1)*math.pi/3); q_ = e_(n_*math.pi/3)
    ok(f"4(1) n={n_} 直線上の点は不動",
       abs(Rn(n_, p_) - p_) < 1e-12 and abs(Rn(n_, q_) - q_) < 1e-12)
    # 対称移動かどうか：中点が直線上に乗り、差が直線と垂直
    z0 = 0.3 - 0.7j
    w0 = Rn(n_, z0); mid = (z0 + w0)/2; d = q_ - p_
    ok(f"4(1) n={n_} 対称移動",
       abs(((mid - p_)/d).imag) < 1e-12 and abs(((w0 - z0)/d).real) < 1e-12)
for z0 in [0j, 1+2j, -3.5+0.25j, 10-7j]:
    z = z0
    for n_ in range(1, 7):
        z = Rn(n_, z)
    ok(f"4(2) z7=z1-3√3i z1={z0}", abs(z - (z0 - 3*math.sqrt(3)*1j)) < 1e-10, f"{z:.6f}")

# 大問5
def Ik(k_):
    return quad(lambda x: x**k_ * math.exp(-x), 0, 100, n=400001)[0]
for k_ in range(1, 6):
    ok(f"5 I_k≒k! k={k_}", abs(Ik(k_) - math.factorial(k_)) < 1e-4*math.factorial(k_),
       f"数値{Ik(k_):.6f} k!={math.factorial(k_)}")
for k_, big in [(1, False), (2, False), (3, False), (4, True), (5, True)]:
    ok(f"5 k={k_} の判定", (math.factorial(k_)/2 > 10) == big, f"{math.factorial(k_)/2}")
# n を大きくすると sin^2 の平均 1/2 に近づく
for k_ in [3, 4]:
    v = quad(lambda x: x**k_*math.exp(-x)*math.sin(300*x)**2, 0, 100, n=600001)[0]
    ok(f"5 n=300 で k!/2 に近い k={k_}", abs(v - math.factorial(k_)/2) < 0.05*math.factorial(k_),
       f"数値{v:.4f} 目標{math.factorial(k_)/2}")

# ══ 東北大理系 2026 ══════════════════════════════════════
print()
print("── 東北大理系 2026 ──")
# 第1問・第2問は文系と同じ問題なので、上の確認がそのまま効く。

# 大問3
g3 = lambda x: 8*x**3 - 6*x*x + 2
h3 = lambda x: 3*x**4 + 8*x**3 - 12*x*x + 5
dg3 = lambda x: 24*x*x - 12*x
dh3 = lambda x: 12*x**3 + 24*x*x - 24*x
for x in (1.0, -1.0):
    ok(f"3(1) x={x} 値が一致", abs(g3(x) - h3(x)) < 1e-12, f"{g3(x)} vs {h3(x)}")
    ok(f"3(1) x={x} 微分係数が一致", abs(dg3(x) - dh3(x)) < 1e-12, f"{dg3(x)} vs {dh3(x)}")
f3 = lambda x: g3(x) if abs(x) <= 1 else h3(x)
grid3 = [-6 + 12*i/600000 for i in range(600001)]
xm = min(grid3, key=f3)
ok("3(2) 最小を与える x", abs(xm - (-1-math.sqrt(3))) < 1e-3, f"全探索{xm:.5f} 式{-1-math.sqrt(3):.5f}")
ok("3(2) 最小値", abs(f3(-1-math.sqrt(3)) - (-39 - 24*math.sqrt(3))) < 1e-10,
   f"{f3(-1-math.sqrt(3)):.10f} vs {-39-24*math.sqrt(3):.10f}")

# 大問4 … 4^8 通りの移動列を全探索
STEPS = [(1,0), (-1,0), (0,1), (0,-1)]
from itertools import product as iprod
cnt40 = cnt_hyp = cnt_both = 0
for seq in iprod(range(4), repeat=8):
    x = y = 0; hit42 = False
    for k, si in enumerate(seq):
        dx, dy = STEPS[si]; x += dx; y += dy
        if k < 7 and (x, y) == (4, 2): hit42 = True
    if (x, y) == (4, 0): cnt40 += 1
    if x*x - y*y == 16:
        cnt_hyp += 1
        if hit42: cnt_both += 1
ok("4(1) P=(4,0)", Fraction(cnt40, 4**8) == Fraction(49, 4096), f"{Fraction(cnt40,4**8)}")
ok("4(2) 双曲線上", Fraction(cnt_hyp, 4**8) == Fraction(7, 256), f"{Fraction(cnt_hyp,4**8)}")
ok("4(3) 条件つき確率", Fraction(cnt_both, cnt_hyp) == Fraction(45, 1792), f"{Fraction(cnt_both,cnt_hyp)}")

# 大問5
ok("5(1) 接点", abs(math.exp(math.pi/4)*math.cos(math.pi/4) - math.exp(math.pi/4)/math.sqrt(2)) < 1e-12)
for al, be in [(3.0,1.0), (3.0,3.0), (1.0,2.0)]:
    I5 = lambda t: math.exp(al*t)*(al*math.cos(be*t)+be*math.sin(be*t))/(al*al+be*be)
    J5 = lambda t: math.exp(al*t)*(al*math.sin(be*t)-be*math.cos(be*t))/(al*al+be*be)
    hh = 1e-6
    ok(f"5(2) I'=被積分 α={al} β={be}",
       abs((I5(0.7+hh)-I5(0.7-hh))/(2*hh) - math.exp(al*0.7)*math.cos(be*0.7)) < 1e-5)
    ok(f"5(2) J'=被積分 α={al} β={be}",
       abs((J5(0.7+hh)-J5(0.7-hh))/(2*hh) - math.exp(al*0.7)*math.sin(be*0.7)) < 1e-5)
V5 = math.pi*quad(lambda t: math.exp(2*t)*math.sin(t)**2 * math.exp(t)*(math.cos(t)-math.sin(t)),
                  0, math.pi/4, n=200001)[0]
want5 = math.pi/60*(math.sqrt(2)*math.exp(3*math.pi/4) - 4)
ok("5(3) 体積", abs(V5 - want5) < 1e-8, f"数値{V5:.10f} 式{want5:.10f}")

# 大問6 … 条件をみたす配置を乱数で作り、Q が球面上に来ることを確かめる
random.seed(1234)
def rnd3(): return [random.uniform(-3, 3) for _ in range(3)]
hits = 0
for _ in range(300):
    M = rnd3(); r = random.uniform(1.0, 3.0)
    O = rnd3()
    def on_sphere(d):
        n = math.sqrt(sum(v*v for v in d))
        return [M[i] + r*d[i]/n for i in range(3)]
    A = on_sphere(rnd3()); B = on_sphere(rnd3())
    C = on_sphere(rnd3()); D = on_sphere(rnd3())
    OA = [A[i]-O[i] for i in range(3)]; OB = [B[i]-O[i] for i in range(3)]
    na = sum(v*v for v in OA); nb = sum(v*v for v in OB)
    if na < 1e-6 or nb < 1e-6: continue
    fO = sum((O[i]-M[i])**2 for i in range(3)) - r*r
    a_ = fO/na; b_ = fO/nb                       # P, Q を S 上に乗せる取り方
    P = [O[i] + a_*OA[i] for i in range(3)]
    Q = [O[i] + b_*OB[i] for i in range(3)]
    if abs(a_*na - b_*nb) > 1e-9: continue        # 条件 a|OA|^2 = b|OB|^2
    dP = abs(math.dist(P, M) - r); dQ = abs(math.dist(Q, M) - r)
    if dP > 1e-6: continue
    hits += 1
    if dQ > 1e-6:
        ok("6(2) Q が球面上", False, f"ずれ {dQ:.2e}"); break
else:
    ok("6(2) Q が球面上（乱数300通り）", True, f"{hits} 例で確認")
ok("6 方べきの関係", hits > 100, f"{hits} 例")

# ══ 九大文系 2026 ══════════════════════════════════════
print()
print("── 九大文系 2026 ──")

# 大問1 … 極値を細かい刻みの全探索で、面積を数値積分で
f1 = lambda x: 2*x**3 + 3*x**2 - 36*x + 1
step = 1e-4
xs = [-6 + i*step for i in range(int(11/step) + 1)]
lo_side = [x for x in xs if -5 < x < 0]
hi_side = [x for x in xs if 0 < x < 4]
xmax = max(lo_side, key=f1)
xmin = min(hi_side, key=f1)
ok("九大文系1(1) 極大は x=-3", abs(xmax + 3) < 2e-3, f"全探索 {xmax:.5f}")
ok("九大文系1(1) 極大値 82", f1(-3) == 82)
ok("九大文系1(1) 極小は x=2", abs(xmin - 2) < 2e-3, f"全探索 {xmin:.5f}")
ok("九大文系1(1) 極小値 -43", f1(2) == -43)

curve = lambda x: abs(x*x - 1)
line = lambda x: x + 1
# 交点が -1, 0, 2 の3つだけであることを総当たりで。
# x=-1 は曲線の角で接しているだけで差の符号が変わらないため、
# 符号変化ではなく |差| が 0 に落ちる場所を拾う。
diff = lambda x: curve(x) - line(x)
hits = []
x = -4.0
while x < 4.0:
    if abs(diff(x)) < 3e-5:
        hits.append(x)
    x += 1e-5
clustered = []
for r in hits:
    if not clustered or r - clustered[-1] > 1e-2:
        clustered.append(round(r, 3))
    else:
        clustered[-1] = round(r, 3)
ok("九大文系1(2) x=-1 では符号が変わらない（角で接する）",
   diff(-1.01) > 0 and diff(-0.99) > 0 and abs(diff(-1)) < 1e-12)
ok("九大文系1(2) 交点は x=-1,0,2 の3つ", len(clustered) == 3
   and all(abs(a - b) < 2e-3 for a, b in zip(clustered, [-1, 0, 2])), str(clustered))
s1 = quad(lambda x: curve(x) - line(x), -1, 0)[0]
s2 = quad(lambda x: line(x) - curve(x), 0, 1)[0]
s3 = quad(lambda x: line(x) - curve(x), 1, 2)[0]
ok("九大文系1(2) [-1,0] の面積 1/6", abs(s1 - 1/6) < 1e-9, f"{s1:.10f}")
ok("九大文系1(2) [0,2] の面積 2", abs(s2 + s3 - 2) < 1e-9, f"{s2 + s3:.10f}")
ok("九大文系1(2) 合計 13/6", abs(s1 + s2 + s3 - 13/6) < 1e-9, f"{s1 + s2 + s3:.10f}")

# 大問2 … 法線を連立で取り直し、H は「α 上で P に最も近い点」として数値探索で出す
A2 = (1, 1, 1); B2 = (2, 2, 0); C2 = (4, 2, 2)
AB = tuple(B2[i] - A2[i] for i in range(3))
AC = tuple(C2[i] - A2[i] for i in range(3))
dot = lambda u, v: sum(u[i]*v[i] for i in range(3))
n2 = (1, -2, -1)
ok("九大文系2 法線 (1,-2,-1)", dot(n2, AB) == 0 and dot(n2, AC) == 0)
# P を球面上の全方向走査で探す（OP が法線と平行で y<=-1 になる点）
best = None
N = 900
for i in range(N):
    th = math.pi * (i + 0.5) / N
    for j in range(2 * N):
        ph = 2 * math.pi * j / (2 * N)
        p_ = (1 + math.sin(th)*math.cos(ph), -1 + math.sin(th)*math.sin(ph), -1 + math.cos(th))
        if p_[1] > -1:
            continue
        cx = (p_[1]*n2[2] - p_[2]*n2[1], p_[2]*n2[0] - p_[0]*n2[2], p_[0]*n2[1] - p_[1]*n2[0])
        err = math.sqrt(dot(cx, cx))
        if best is None or err < best[0]:
            best = (err, p_)
    if i % 150 == 0 and best and best[0] < 1e-3:
        break
ok("九大文系2(1) P=(1,-2,-1)", best is not None
   and max(abs(best[1][k] - v) for k, v in enumerate((1, -2, -1))) < 5e-2,
   f"球面走査 {tuple(round(v, 4) for v in best[1])}")
P2 = (1, -2, -1)
ok("九大文系2(1) P は球面上", abs((P2[0]-1)**2 + (P2[1]+1)**2 + (P2[2]+1)**2 - 1) < 1e-12)
ok("九大文系2(1) もう一方の解は y>-1", abs(-2/3) < 1 and -2/3 > -1)
# H を数値的な最小化で（s,t を細かく動かす）
bs = bt = 0.0; bd = 1e9; stp = 1.0
for _ in range(90):
    for ds in (-1, 0, 1):
        for dt in (-1, 0, 1):
            s_, t_ = bs + ds*stp, bt + dt*stp
            h = tuple(A2[i] + s_*AB[i] + t_*AC[i] for i in range(3))
            d = math.dist(h, P2)
            if d < bd:
                bd, ns_, nt_ = d, s_, t_
    bs, bt = ns_, nt_
    stp *= 0.7
ok("九大文系2(2) s=1/6", abs(bs - 1/6) < 1e-6, f"数値探索 {bs:.8f}")
ok("九大文系2(2) t=-1/2", abs(bt + 0.5) < 1e-6, f"数値探索 {bt:.8f}")
H2 = tuple(A2[i] + (1/6)*AB[i] + (-0.5)*AC[i] for i in range(3))
ok("九大文系2(2) H=(-1/3,2/3,1/3)", max(abs(H2[k]-v) for k, v in enumerate((-1/3, 2/3, 1/3))) < 1e-12)
PH = tuple(H2[i] - P2[i] for i in range(3))
ok("九大文系2(2) PH ⊥ α", abs(dot(PH, AB)) < 1e-12 and abs(dot(PH, AC)) < 1e-12)
AP = tuple(P2[i] - A2[i] for i in range(3))
det = (AB[0]*(AC[1]*AP[2] - AC[2]*AP[1]) - AB[1]*(AC[0]*AP[2] - AC[2]*AP[0])
       + AB[2]*(AC[0]*AP[1] - AC[1]*AP[0]))
ok("九大文系2(3) 体積 8/3（行列式）", abs(abs(det)/6 - 8/3) < 1e-12, f"{abs(det)/6:.10f}")
ok("九大文系2(3) 体積 8/3（底面×高さ）",
   abs((1/3) * math.sqrt(6) * (8/math.sqrt(6)) - 8/3) < 1e-12)

# 大問3 … (√2+1)^n+(√2-1)^n が整数になる n を、有理数演算で判定する
# a+b√2 の形を (a, b) で持ち、整数のまま掛ける。b=0 になるときだけ整数。
def mul(u, v):
    return (u[0]*v[0] + 2*u[1]*v[1], u[0]*v[1] + u[1]*v[0])
bad = []
for n in range(1, 61):
    x = (1, 1); y = (-1, 1); px = (1, 0); py = (1, 0)
    for _ in range(n):
        px = mul(px, x); py = mul(py, y)
    sgn = (px[0] + py[0], px[1] + py[1])
    if (sgn[1] == 0) != (n % 2 == 0):
        bad.append(n)
ok("九大文系3(2) 整数になるのは n が偶数のときだけ（n≤60 を整数演算で全探索）", not bad, str(bad))
ok("九大文系3(2) n=2 で 6", mul(mul((1, 1), (1, 1)), (1, 0))[0] + mul(mul((-1, 1), (-1, 1)), (1, 0))[0] == 6)

# 大問4 は理科系 大問3 と同一問題。上の確認をそのまま使う。

# ══ 名市大医 2026 ══════════════════════════════════════
print()
print("── 名市大医 2026 ──")
import itertools

# 大問1 … H は「平面 OBC 上で A に最も近い点」として数値探索で出す
A1 = (2, 1, 4); B1 = (3, 0, 1); C1 = (1, 2, 1)
dot3 = lambda u, v: sum(u[i]*v[i] for i in range(3))
def on_plane(s_, t_): return tuple(s_*B1[i] + t_*C1[i] for i in range(3))
bs = bt = 0.0; bd = 1e9; stp = 1.0
for _ in range(120):
    for ds in (-1, 0, 1):
        for dt in (-1, 0, 1):
            s_, t_ = bs + ds*stp, bt + dt*stp
            d = math.dist(on_plane(s_, t_), A1)
            if d < bd: bd, ns_, nt_ = d, s_, t_
    bs, bt = ns_, nt_; stp *= 0.72
H1 = on_plane(bs, bt)
want = (Fraction(31, 11), Fraction(20, 11), Fraction(17, 11))
ok("名市大医1(1) H=(31/11,20/11,17/11)",
   max(abs(H1[i] - float(want[i])) for i in range(3)) < 1e-7,
   f"数値探索 {tuple(round(v, 6) for v in H1)}")
ok("名市大医1(1) H は平面 x+y-3z=0 上",
   abs(float(want[0]) + float(want[1]) - 3*float(want[2])) < 1e-12)
cr1 = (B1[1]*C1[2] - B1[2]*C1[1], B1[2]*C1[0] - B1[0]*C1[2], B1[0]*C1[1] - B1[1]*C1[0])
S1 = math.sqrt(dot3(cr1, cr1)) / 2
ok("名市大医1(2) 三角形OBC=√11", abs(S1 - math.sqrt(11)) < 1e-12, f"{S1:.10f}")
V1 = abs(dot3(A1, cr1)) / 6
ok("名市大医1(2) 体積 3（行列式）", abs(V1 - 3) < 1e-12, f"{V1}")
AH = math.dist(A1, (float(want[0]), float(want[1]), float(want[2])))
ok("名市大医1(2) 体積 3（底面×高さ）", abs(S1*AH/3 - 3) < 1e-7, f"{S1*AH/3:.10f}")
pq = (Fraction(-17, 9), Fraction(1, 9), Fraction(-13, 3))
for nm, P_ in (("O", (0, 0, 0)), ("A", A1), ("B", B1), ("C", C1)):
    val = sum(Fraction(c)**2 for c in P_) + sum(pq[i]*P_[i] for i in range(3))
    ok(f"名市大医1(3) 球面が {nm} を通る", val == 0, f"残差 {val}")
r2 = Fraction(17, 18)**2 + Fraction(1, 18)**2 + Fraction(13, 6)**2
ok("名市大医1(3) 半径^2 = 1811/324", r2 == Fraction(1811, 324), str(r2))

# 大問2 … 6^6 通りを全探索し、回転24通りで正規化して数える
OPP = {0: 1, 1: 0, 2: 3, 3: 2, 4: 5, 5: 4}
ADJ = [(i, j) for i in range(6) for j in range(i+1, 6) if OPP[i] != j]
compose = lambda a, b: tuple(a[b[i]] for i in range(6))
ROT = {tuple(range(6))}
while True:
    grown = {compose(g, h) for g in ROT for h in ((2, 3, 1, 0, 4, 5), (4, 5, 2, 3, 1, 0))} | ROT
    if grown == ROT: break
    ROT = grown
ok("名市大医2 回転群は24個", len(ROT) == 24, str(len(ROT)))
proper = lambda c: all(c[i] != c[j] for i, j in ADJ)
kinds, all6, labeled = set(), set(), 0
for c in itertools.product(range(6), repeat=6):
    if not proper(c): continue
    labeled += 1
    k = min(tuple(c[g[i]] for i in range(6)) for g in ROT)
    kinds.add(k)
    if len(set(c)) == 6: all6.add(k)
ok("名市大医2 ラベル付きの正当な塗り分け 4080", labeled == 4080, str(labeled))
ok("名市大医2(1) 6色すべて使う = 30", len(all6) == 30, str(len(all6)))
ok("名市大医2(2) 何色か使う = 230", len(kinds) == 230, str(len(kinds)))

# 大問3 … 漸化式そのものを回して一般項と突き合わせ、m を全探索
def a_seq(m, upto):
    a = [0]
    for n in range(1, upto): a.append(a[-1] + m**(n+1) - m**n - m)
    return a
ok("名市大医3(1) a_n=m^n-nm が漸化式に合う（m≤5, n≤12）",
   all(a_seq(m, 13)[n-1] == m**n - n*m for m in range(1, 6) for n in range(1, 13)))
ok("名市大医3(2) a_9=494 をみたす m は 2 だけ",
   [m for m in range(1, 200) if m**9 - 9*m == 494] == [2])
def is_prime(x): return x > 1 and all(x % d for d in range(2, int(x**0.5) + 1))
with_prime = [m for m in range(1, 500) if any(is_prime(m**n - n*m) for n in range(1, 40))]
ok("名市大医3(3) 素数の項をもつ m は 2,3 だけ（m≤499, n≤39 を全探索）",
   with_prime == [2, 3], str(with_prime))
ok("名市大医3(3) m=2 は a_3=2、m=3 は a_2=3", 2**3 - 3*2 == 2 and 3**2 - 2*3 == 3)

# 大問4 … (1) を数値で、(2)(4) を数値積分と級数の直接和で
f_n = lambda n, x: math.sin((2*n + 1)*x/2) / (2*math.sin(x/2))
worst = max(abs(f_n(k, x) - f_n(k-1, x) - math.cos(k*x))
            for k in range(1, 15)
            for x in [1 + i*(math.pi - 1)/50 for i in range(51)])
ok("名市大医4(1) f_k-f_(k-1)=cos kx", worst < 1e-9, f"最大誤差 {worst:.2e}")
ok("名市大医4(2) I_0=(π-1)/2",
   abs(quad(lambda x: f_n(0, x), 1, math.pi)[0] - (math.pi - 1)/2) < 1e-9)
for n in (1, 3, 7, 20):
    In = quad(lambda x: f_n(n, x), 1, math.pi)[0]
    Sn = sum(math.sin(k)/k for k in range(1, n+1))
    ok(f"名市大医4(2) n={n:2d} で Σsin k/k = (π-1)/2 - I_n",
       abs(Sn - ((math.pi - 1)/2 - In)) < 1e-7, f"{Sn:.10f} / {(math.pi-1)/2-In:.10f}")
Is = [abs(quad(lambda x: f_n(n, x), 1, math.pi, 100001)[0]) for n in (10, 50, 200, 800)]
ok("名市大医4(3) I_n → 0", Is[-1] < 5e-3 and Is[-1] < Is[0],
   f"n=10,50,200,800 で {[round(v, 6) for v in Is]}")
total = sum(math.sin(k)/k for k in range(1, 400000))
ok("名市大医4(4) 級数の和 = (π-1)/2", abs(total - (math.pi - 1)/2) < 2e-5,
   f"40万項 {total:.9f} / {(math.pi-1)/2:.9f}")

# ══ 三重大 数学②（医・工） 2026 ════════════════════════
print()
print("── 三重大 数学② 2026 ──")
import cmath

# 大問1(1) … 円になる k を、平方完成の右辺の符号で 1/500 刻みに全探索
circle_rhs = lambda k: Fraction(13, 4) / (k + 1) ** 2 - (5 - 3 * k) / (k + 1)
predicted = lambda k: (-1 < k < Fraction(-1, 2)) or (k > Fraction(7, 6))
off = [k for i in range(-999, 4001) for k in [Fraction(i, 500)]
       if k > -1 and (circle_rhs(k) > 0) != predicted(k)]
ok("三重大1(1) 円 ⟺ -1<k<-1/2 または k>7/6", not off, f"1/500刻みで全探索 外れ{len(off)}件")
ok("三重大1(1) 境界は 12k^2-8k-7=0 の解",
   all(12 * b * b - 8 * b - 7 == 0 for b in (Fraction(-1, 2), Fraction(7, 6))))
ok("三重大1(1) k=7/6 では1点に縮む", circle_rhs(Fraction(7, 6)) == 0)

# 大問1(2)
A2 = (Fraction(1), Fraction(7)); B2 = (Fraction(-2), Fraction(-2))
C2 = tuple((A2[i] + 2 * B2[i]) / 3 for i in range(2))
ok("三重大1(2) C=(-1,1)", C2 == (Fraction(-1), Fraction(1)), str(C2))
ip = A2[0] * C2[0] + A2[1] * C2[1]
ok("三重大1(2) OA・OC=6", ip == 6, str(ip))
cosA = float(ip) / (math.hypot(1, 7) * math.hypot(-1, 1))
ok("三重大1(2) cos∠AOC=3/5 で 60°より小さい", abs(cosA - 0.6) < 1e-12 and cosA > 0.5,
   f"{math.degrees(math.acos(cosA)):.2f}°")

# 大問1(3) … sinθ=sin2θ の解を数値で探し、a-b=1 の組を変えても同じか見る
roots = []
prev = None
for i in range(2_000_001):
    th = 2 * math.pi * i / 2_000_000
    v = math.sin(th) - math.sin(2 * th)
    if prev is not None and (v == 0 or prev * v < 0):
        if not roots or th - roots[-1] > 1e-3:
            roots.append(th)
    prev = v
want3 = [0.0, math.pi / 3, math.pi, 5 * math.pi / 3]
ok("三重大1(3) 解は 0, π/3, π, 5π/3",
   all(min(abs(r - w) for r in roots + [0.0]) < 1e-4 for w in want3),
   f"数値探索 {[round(r, 5) for r in roots]}")
eq = lambda a, b, t: abs(math.sin(a*t)*math.cos(b*t) - (math.cos(a*t)*math.sin(b*t) + math.sin(2*t)))
ok("三重大1(3) a,b の取り方によらない（a-b=1 を4組）",
   all(eq(a, b, w) < 1e-12 for a, b in [(3, 2), (1.5, .5), (-2, -3), (7, 6)] for w in want3))

# 大問1(4)
ok("三重大1(4) 5log_3 2 > 3", 5 * math.log(2, 3) > 3, f"{5*math.log(2,3):.9f}")
ok("三重大1(4) log_2 12 < log_3 72", math.log(12, 2) < math.log(72, 3),
   f"{math.log(12,2):.9f} < {math.log(72,3):.9f}")
tt = math.log(3, 2)
ok("三重大1(4) log_2 3 < 5/3 とその2乗 < 3", tt < 5 / 3 and tt * tt < 3, f"t={tt:.9f}, t^2={tt*tt:.9f}")

# 大問1(5) … 円周上の z を4000点とって w を写す
cen5 = complex(1, 0.5); rad5 = math.sqrt(2) / 2
far = max(abs(abs(((1j + 1) * (1j + cmath.exp(1j * th)) + 3) / 2 - cen5) - rad5)
          for th in [2 * math.pi * i / 4000 for i in range(4000)])
ok("三重大1(5) w は中心 1+i/2、半径 √2/2 の円", far < 1e-12, f"最大ずれ {far:.2e}")

# 大問2 … 36通りを全列挙して分数のまま
space = [(x, y) for x in range(1, 7) for y in range(1, 7)]
Ev = lambda f: sum(Fraction(f(x, y)) for x, y in space) * Fraction(1, 36)
ok("三重大2(1) P(Z=6)=5/36",
   sum(1 for x, y in space if x + y == 6) * Fraction(1, 36) == Fraction(5, 36))
ok("三重大2(1) P(X=2 かつ Z=6)=1/36",
   sum(1 for x, y in space if x == 2 and x + y == 6) * Fraction(1, 36) == Fraction(1, 36))
EX = Ev(lambda x, y: x); EX2 = Ev(lambda x, y: x * x)
ok("三重大2(2) E(X)=7/2", EX == Fraction(7, 2))
ok("三重大2(2) V(X)=35/12", EX2 - EX ** 2 == Fraction(35, 12))
EZ = Ev(lambda x, y: x + y)
ok("三重大2(3) E(Z)=7", EZ == 7)
ok("三重大2(3) V(Z)=35/6", Ev(lambda x, y: (x + y) ** 2) - EZ ** 2 == Fraction(35, 6))
EXY = Ev(lambda x, y: x * y); EXZ = Ev(lambda x, y: x * (x + y))
ok("三重大2(4) E(XY)=49/4", EXY == Fraction(49, 4))
ok("三重大2(4) E(XZ)=329/12", EXZ == Fraction(329, 12))
ok("三重大2(4) E(XZ)-E(X)E(Z)=V(X)", EXZ - EX * EZ == Fraction(35, 12))

# 大問3(1) … 原始関数を数値微分して被積分関数に戻るか
prim = lambda t, a, b: math.exp(a*t) * (a*math.cos(b*t) + b*math.sin(b*t)) / (a*a + b*b)
bad3 = 0.0
for a, b in [(1, 2), (-1, 0.5), (3, -1), (0.7, 0.3)]:
    for t in [-1 + 0.013 * i for i in range(200)]:
        h = 1e-6
        bad3 = max(bad3, abs((prim(t+h, a, b) - prim(t-h, a, b)) / (2*h) - math.exp(a*t)*math.cos(b*t)))
ok("三重大3(1) 原始関数の微分が e^(at)cos(bt) に戻る", bad3 < 1e-6, f"最大誤差 {bad3:.2e}")

# 大問3(2) … 長さを数値積分と折れ線の2通りで
cx = lambda t: math.exp(-t) * (math.cos(t) + math.sin(t))
cy = lambda t: math.exp(-t) * (math.cos(t) - math.sin(t) + 2)
hh = 1e-7
speed = lambda t: math.hypot((cx(t+hh) - cx(t-hh)) / (2*hh), (cy(t+hh) - cy(t-hh)) / (2*hh))
exact = 8 / 5 * (2 + math.exp(-math.pi))
ok("三重大3(2) 速さ = 4e^(-t)cos(t/2)",
   max(abs(speed(t) - 4*math.exp(-t)*math.cos(t/2))
       for t in [0.001 + (math.pi - 0.002) * i / 500 for i in range(501)]) < 1e-5)
num = quad(speed, 0, math.pi, 100001)[0]
ok("三重大3(2) 長さ (8/5)(2+e^-π)（数値積分）", abs(num - exact) < 1e-6, f"{num:.9f} / {exact:.9f}")
N3 = 400000
poly = sum(math.hypot(cx(math.pi*(i+1)/N3) - cx(math.pi*i/N3),
                      cy(math.pi*(i+1)/N3) - cy(math.pi*i/N3)) for i in range(N3))
ok("三重大3(2) 長さ（40万分割の折れ線）", abs(poly - exact) < 1e-4, f"{poly:.9f} / {exact:.9f}")

# ══ 名工大 2026 ════════════════════════════════════════
print()
print("── 名工大 2026 ──")
import numpy as np

# 大問1 … u=log x の3次式として全探索し、面積は数値積分で
fn1 = lambda x: (math.log(x) ** 3) / 3 - 3 * math.log(x)
uu = [-6 + 12 * i / 2_400_000 for i in range(2_400_001)]
gg = [u ** 3 / 3 - 3 * u for u in uu]
neg = [(g, u) for g, u in zip(gg, uu) if u < 0]
pos = [(g, u) for g, u in zip(gg, uu) if u > 0]
ok("名工大1(1) 極大は log x=-√3", abs(max(neg)[1] + math.sqrt(3)) < 1e-4, f"{max(neg)[1]:.6f}")
ok("名工大1(1) 極小は log x= √3", abs(min(pos)[1] - math.sqrt(3)) < 1e-4, f"{min(pos)[1]:.6f}")
ok("名工大1(1) 極大値 2√3", abs(fn1(math.exp(-math.sqrt(3))) - 2 * math.sqrt(3)) < 1e-9)
ok("名工大1(1) 極小値 -2√3", abs(fn1(math.exp(math.sqrt(3))) + 2 * math.sqrt(3)) < 1e-9)
def d2(x):
    h = x * 1e-4
    return (fn1(x + h) - 2 * fn1(x) + fn1(x - h)) / h ** 2
for xv, nm, yv in ((math.exp(-1), "e^-1", 8 / 3), (math.exp(3), "e^3", 0.0)):
    ok(f"名工大1(2) x={nm} で凹凸が変わる", d2(xv * 0.97) * d2(xv * 1.03) < 0)
    ok(f"名工大1(2) 変曲点の y 座標", abs(fn1(xv) - yv) < 1e-9, f"{fn1(xv):.9f} → {yv}")
area1 = quad(fn1, math.exp(-3), 1, 200001)[0] + quad(lambda x: -fn1(x), 1, math.exp(3), 200001)[0]
want1 = 2 * math.exp(3) + 14 * math.exp(-3) + 2
ok("名工大1(3) 面積 2e^3+14e^-3+2", abs(area1 - want1) < 1e-6, f"{area1:.9f} / {want1:.9f}")

# 大問2 … 漸化式を直接回して閉じた式と突き合わせる
ok("名工大2(1) x^2+x-xy-y=(x+1)(x-y)",
   all(abs((x*x + x - x*y - y) - (x+1)*(x-y)) < 1e-12 for x in (-3, .5, 2, 7) for y in (-2, 0, 1.5, 9)))
def nxt2(a, n):
    A = a + 1
    return A / (A / ((n + 1) * n) + 1) - 1
closed2 = lambda n, a1: (a1 + 1 - n) / ((n - 1) * a1 + 2 * n - 1)
for a1 in (0.3, 2.0, -5.0, 7.5):
    a = a1; worst = 0.0; holds = True
    for n in range(1, 13):
        worst = max(worst, abs(a - closed2(n, a1)))
        nx = nxt2(a, n)
        if abs((nx + 1) * (a + 1) ** 2 / ((n + 1) * n) - (a*a + a - a*nx - nx)) > 1e-9:
            holds = False
        a = nx
    ok(f"名工大2(3) a_1={a1} で漸化式と閉じた式が一致", holds and worst < 1e-9, f"最大誤差 {worst:.1e}")
ok("名工大2(4) a_1=-7/2 で a_10=1", closed2(10, Fraction(-7, 2)) == 1)
f_one = Fraction(-1)
ok("名工大2(4) a_1=-1 なら n=1 の式は a_2 によらず成立",
   all((Fraction(k) + 1) * (f_one + 1) ** 2 / 2 == f_one * f_one + f_one - f_one * Fraction(k) - Fraction(k)
       for k in range(-5, 6)))
bb = Fraction(1, 10)                     # a_2=9 すなわち b_2=1/10
for n in range(2, 10):
    bb += Fraction(1, n * (n + 1))
ok("名工大2(4) a_1=-1, a_2=9 で a_10=1", 1 / bb - 1 == 1, f"a_10={1/bb-1}")

# 大問3 … 一辺1の正四面体を実座標で作って確かめる
O3 = (0.0, 0.0, 0.0); A3 = (1.0, 0.0, 0.0)
B3 = (0.5, math.sqrt(3) / 2, 0.0)
C3 = (0.5, math.sqrt(3) / 6, math.sqrt(6) / 3)
edge_ok = all(abs(math.dist(P, Q) - 1) < 1e-12
              for P, Q in ((O3, A3), (O3, B3), (O3, C3), (A3, B3), (A3, C3), (B3, C3)))
ok("名工大3 一辺1の正四面体を構成", edge_ok)
lin = lambda *ps: tuple(sum(c * p[i] for c, p in ps) for i in range(3))
D3 = lin((0.25, A3), (0.75, B3))
E3 = lin((1 / 7, C3), (6 / 7, D3))
E3f = lin((3 / 14, A3), (9 / 14, B3), (1 / 7, C3))
ok("名工大3(1) OE=(3/14)a+(9/14)b+(1/7)c", max(abs(E3[i] - E3f[i]) for i in range(3)) < 1e-12)
bs = bt = 0.0; bd = 1e9; stp = 1.0
for _ in range(140):
    for ds in (-1, 0, 1):
        for dt in (-1, 0, 1):
            s_, t_ = bs + ds * stp, bt + dt * stp
            d = math.dist(lin((s_, A3), (t_, C3)), E3)
            if d < bd: bd, ns_, nt_ = d, s_, t_
    bs, bt = ns_, nt_; stp *= 0.75
ok("名工大3(2) OH=(3/7)a+(5/14)c", abs(bs - 3/7) < 1e-7 and abs(bt - 5/14) < 1e-7,
   f"数値探索 s={bs:.8f} t={bt:.8f}")
H3 = lin((3 / 7, A3), (5 / 14, C3))
dot3b = lambda u, v: sum(u[i] * v[i] for i in range(3))
EH = tuple(H3[i] - E3[i] for i in range(3))
ok("名工大3(2) EH ⊥ 平面OAC", abs(dot3b(EH, A3)) < 1e-12 and abs(dot3b(EH, C3)) < 1e-12)
AH3 = tuple(H3[i] - A3[i] for i in range(3)); AB3 = tuple(B3[i] - A3[i] for i in range(3))
cos3 = dot3b(AH3, AB3) / (math.sqrt(dot3b(AH3, AH3)) * math.sqrt(dot3b(AB3, AB3)))
ok("名工大3(3) cosθ=4/7", abs(cos3 - 4 / 7) < 1e-12, f"{cos3:.12f}")
ok("名工大3(3) |AH|=1/2", abs(math.sqrt(dot3b(AH3, AH3)) - 0.5) < 1e-12)
cx3 = (AB3[1]*AH3[2] - AB3[2]*AH3[1], AB3[2]*AH3[0] - AB3[0]*AH3[2], AB3[0]*AH3[1] - AB3[1]*AH3[0])
S3 = math.sqrt(dot3b(cx3, cx3)) * (0.5 * 2 * (2 / math.sqrt(3)))
ok("名工大3(4) S=√11/7", abs(S3 - math.sqrt(11) / 7) < 1e-12, f"{S3:.12f} / {math.sqrt(11)/7:.12f}")

# 大問4 … 共有点の個数を数え、体積を数値積分と二分法で
f4 = lambda x: x ** 3 - 2 * x + 4
ok("名工大4 f(-2)=0 と因数分解", abs(f4(-2)) < 1e-12
   and all(abs(f4(x) - (x + 2) * (x*x - 2*x + 2)) < 1e-9 for x in (-2, -1, 0, 1, 3, 7.5)))
rt6 = math.sqrt(6) / 3
ok("名工大4(1) 極大値 4+4√6/9", abs(f4(-rt6) - (4 + 4*math.sqrt(6)/9)) < 1e-12)
ok("名工大4(1) 極小値 4-4√6/9", abs(f4(rt6) - (4 - 4*math.sqrt(6)/9)) < 1e-12)
def count_pts(t):
    g = lambda x: math.sqrt(max(f4(x), 0)) - math.sqrt(t) * (x + 2)
    prev = g(-2 + 1e-9); c = 0; x = -2 + 1e-9
    while x < 38:
        x += 0.0004
        v = g(x)
        if prev == 0 or prev * v < 0: c += 1
        prev = v
    return c + 1
bd4 = 2 * math.sqrt(10) - 6
ok("名工大4(2) 境界 t=2√10-6 は t^2+12t-4=0 の正の解", abs(bd4*bd4 + 12*bd4 - 4) < 1e-12)
ok("名工大4(2) t>2√10-6 で3点、下回ると1点",
   count_pts(bd4 + 0.02) == 3 and count_pts(bd4 - 0.02) == 1,
   f"t={bd4+0.02:.3f}→{count_pts(bd4+0.02)}点、t={bd4-0.02:.3f}→{count_pts(bd4-0.02)}点")
r4 = (2 + bd4) / 2
ok("名工大4(3) 重解は x=√10-2", abs(r4 - (math.sqrt(10) - 2)) < 1e-12)
V4 = math.pi * quad(lambda x: f4(x) - bd4 * (x + 2) ** 2, -2, r4, 200001)[0]
ok("名工大4(3) V=25π/3", abs(V4 - 25 * math.pi / 3) < 1e-6, f"{V4:.9f} / {25*math.pi/3:.9f}")
def v1v2(t):
    disc = math.sqrt((2 + t) ** 2 - 4 * (2 - 2 * t))
    p_, q_ = ((2 + t) - disc) / 2, ((2 + t) + disc) / 2
    a_ = math.pi * quad(lambda x: f4(x) - t * (x + 2) ** 2, -2, p_, 100001)[0]
    b_ = math.pi * quad(lambda x: t * (x + 2) ** 2 - f4(x), p_, q_, 100001)[0]
    return a_, b_
tw = 3 * math.sqrt(5) - 6
v1, v2 = v1v2(tw)
ok("名工大4(4) t=3√5-6 で V1=V2", abs(v1 - v2) < 1e-6, f"V1={v1:.9f} V2={v2:.9f} 差{abs(v1-v2):.1e}")
ok("名工大4(4) その t は3点をもつ範囲に入る", tw > bd4, f"{tw:.9f} > {bd4:.9f}")
lo4, hi4 = bd4 + 1e-4, 5.0
s0 = v1v2(lo4)[0] - v1v2(lo4)[1]
for _ in range(60):
    mid = (lo4 + hi4) / 2
    a_, b_ = v1v2(mid)
    if (a_ - b_) * s0 > 0: lo4 = mid
    else: hi4 = mid
ok("名工大4(4) 二分法でも同じ t", abs((lo4 + hi4) / 2 - tw) < 1e-5, f"{(lo4+hi4)/2:.9f} / {tw:.9f}")

# ══ 電通大 2026 ════════════════════════════════════════
print()
print("── 電通大 2026 ──")

# 大問1
fu = lambda x: 3*math.sin(2*x) + 2*math.sin(3*x)
grid = [math.pi*i/400000 for i in range(1, 400000)]
ok("電通大1(i) 極大 x1=π/5", abs(max(grid, key=fu) - math.pi/5) < 1e-4)
ok("電通大1(i) 極小 x2=3π/5", abs(min(grid, key=fu) - 3*math.pi/5) < 1e-4)
ok("電通大1(i) f'=12cos(5x/2)cos(x/2)",
   max(abs((fu(x+1e-6)-fu(x-1e-6))/2e-6 - 12*math.cos(2.5*x)*math.cos(0.5*x))
       for x in [0.05*i for i in range(1, 62)]) < 1e-5)
zs, prev = [], fu(1e-9)
for i in range(1, 400000):
    x = math.pi*i/400000; v = fu(x)
    if prev*v < 0: zs.append(x)
    prev = v
ok("電通大1(ii) cosα=1/4", len(zs) == 1 and abs(math.cos(zs[0]) - 0.25) < 1e-5, f"cosα={math.cos(zs[0]):.7f}")
cs, prev = [], fu(1e-9) - 3*math.sin(2e-9)
for i in range(1, 400000):
    x = math.pi*i/400000; v = fu(x) - 3*math.sin(2*x)
    if prev*v < 0: cs.append(x)
    prev = v
ok("電通大1(iii) β=π/3", cs and abs(cs[0] - math.pi/3) < 1e-5, f"β={cs[0]:.7f}")
Iu = quad(lambda x: math.sin(2*x)*math.sin(3*x), 0, math.pi/3, 200001)[0]
ok("電通大1(iv) I=3√3/10", abs(Iu - 3*math.sqrt(3)/10) < 1e-9, f"{Iu:.10f}")
Vu = math.pi*quad(lambda x: fu(x)**2 - (3*math.sin(2*x))**2, 0, math.pi/3, 200001)[0]
wantV = 18*math.sqrt(3)*math.pi/5 + 2*math.pi**2/3
ok("電通大1(v) V=18√3π/5+2π²/3", abs(Vu - wantV) < 1e-6, f"{Vu:.9f} / {wantV:.9f}")

# 大問2
f2 = lambda x: (3*math.exp(x) - 1)/(math.exp(x) + 1)**2
g2 = [-30 + 60*i/400000 for i in range(400001)]
pk = max(g2, key=f2)
# 格子の最大点は厳密な極大点と少しずれるので、位置は格子で、値は厳密点で確かめる
ok("電通大2(i) 極大の位置 log(5/3)", abs(pk - math.log(5/3)) < 1e-3, f"格子最大 {pk:.6f}")
ok("電通大2(i) 極大値 9/16", abs(f2(math.log(5/3)) - 9/16) < 1e-12, f"{f2(math.log(5/3)):.12f}")
ok("電通大2(i) 極大点の前後で増減が変わる",
   f2(math.log(5/3) - 0.01) < f2(math.log(5/3)) > f2(math.log(5/3) + 0.01))
ok("電通大2(ii) 値域 -1<y≤9/16",
   min(f2(x) for x in g2) > -1 and max(f2(x) for x in g2) <= 9/16 + 1e-12 and abs(f2(-60) + 1) < 1e-12)
Ip = lambda t: math.log(t/(t+1))
Jp = lambda t: math.log(t/(t+1)) + 1/(t+1)
ok("電通大2(iii) I の原始関数",
   max(abs((Ip(t+1e-7)-Ip(t-1e-7))/2e-7 - 1/(t*(t+1))) for t in [0.3+0.7*i for i in range(12)]) < 1e-5)
ok("電通大2(iii) J の原始関数",
   max(abs((Jp(t+1e-7)-Jp(t-1e-7))/2e-7 - 1/(t*(t+1)**2)) for t in [0.3+0.7*i for i in range(12)]) < 1e-5)
S0 = quad(f2, -math.log(3), 0, 200001)[0]
ok("電通大2(iv) S(0)=1-log2", abs(S0 - (1 - math.log(2))) < 1e-9, f"{S0:.10f}")
Sinf = quad(f2, -math.log(3), 40, 200001)[0]
ok("電通大2(iv) lim S(M)=3-2log2", abs(Sinf - (3 - 2*math.log(2))) < 1e-6, f"{Sinf:.9f}")

# 大問3 … α,β を刻んで全探索
Lf = lambda a: math.sqrt(17 - 8*math.cos(a)) - 1
def Lmin(a, n=4000):
    P = (-2 + math.cos(a), math.sin(a))
    return min(math.dist(P, (2 + math.cos(2*math.pi*i/n), math.sin(2*math.pi*i/n))) for i in range(n))
ok("電通大3(i) L(α)=√(17-8cosα)-1", all(abs(Lf(a) - Lmin(a)) < 2e-3 for a in (0.0, 1.0, 2.5, math.pi, 4.7)))
ok("電通大3(i) 最大 L=4（α=π）", abs(Lf(math.pi) - 4) < 1e-12)
N3 = 1200
best_m = -9; best_mp = -9; best_sy = -9; arg = None
for i in range(N3):
    a = 2*math.pi*i/N3
    P = (-2 + math.cos(a), math.sin(a))
    for j in range(N3):
        b = 2*math.pi*j/N3
        Q = (2 + math.cos(b), math.sin(b))
        best_m = max(best_m, (Q[1]-P[1])/(Q[0]-P[0]))
        v = (Q[0]-P[0], Q[1]-P[1]); w = (-v[1], v[0])
        R = (Q[0]+w[0], Q[1]+w[1]); Sp = (P[0]+w[0], P[1]+w[1])
        if R[1] <= 0: continue
        if abs(R[0]-P[0]) > 1e-9: best_mp = max(best_mp, (R[1]-P[1])/(R[0]-P[0]))
        if Sp[1] > best_sy: best_sy = Sp[1]; arg = (a, b, P, Q)
ok("電通大3(ii) m の最大 1/√3", abs(best_m - 1/math.sqrt(3)) < 5e-3, f"{best_m:.6f}")
ok("電通大3(iii) m' の最大 2+√3", abs(best_mp - (2 + math.sqrt(3))) < 2e-2, f"{best_mp:.6f}")
ok("電通大3(iv) S の y の最大 5+√2", abs(best_sy - (5 + math.sqrt(2))) < 1e-4, f"{best_sy:.7f}")
a_, b_, P_, Q_ = arg
ok("電通大3(iv) そのとき α=3π/4, β=0",
   abs(a_ - 3*math.pi/4) < 1e-2 and min(abs(b_), abs(b_ - 2*math.pi)) < 1e-2)
ok("電通大3(iv) P=(-2-√2/2, √2/2), Q=(3,0)",
   abs(P_[0] + 2 + math.sqrt(2)/2) < 1e-2 and abs(P_[1] - math.sqrt(2)/2) < 1e-2
   and abs(Q_[0] - 3) < 1e-2 and abs(Q_[1]) < 1e-2)
Pz = (-2 - math.sqrt(2)/2, math.sqrt(2)/2); Qz = (3.0, 0.0)
vz = (Qz[0]-Pz[0], Qz[1]-Pz[1]); wz = (-vz[1], vz[0])
Rz = (Qz[0]+wz[0], Qz[1]+wz[1]); Sz = (Pz[0]+wz[0], Pz[1]+wz[1])
sides = [math.dist(Pz, Qz), math.dist(Qz, Rz), math.dist(Rz, Sz), math.dist(Sz, Pz)]
ok("電通大3(iv) PQRS は正方形", max(sides) - min(sides) < 1e-9
   and abs(math.dist(Pz, Rz) - math.dist(Qz, Sz)) < 1e-9)

# 大問4
seq = [None, 1, 4, 12, 32]
while len(seq) < 34: seq.append(4*(seq[-1] - seq[-2]))
ok("電通大4(i) a1=1, a3=12", seq[1] == 1 and seq[3] == 12)
ok("電通大4(iii) a_n=n·2^(n-1)", all(seq[n] == n*2**(n-1) for n in range(1, 31)))
bk = lambda n: seq[n+1] - 2*seq[n]
ok("電通大4(ii) b_n=2^n と b_(n+1)=2b_n",
   all(bk(n) == 2**n for n in range(1, 30)) and all(bk(n+1) == 2*bk(n) for n in range(1, 29)))
ok("電通大4(iii) c_(n+1)=c_n+1/2, c_n=n/2",
   all(abs(seq[n]/2**n - n/2) < 1e-12 for n in range(1, 30)))
Sn = lambda n: sum(seq[k] for k in range(1, n+1))
Tn = lambda n: sum(bk(k) for k in range(1, n+1))
ok("電通大4(iv) T_n=2^(n+1)-2", all(Tn(n) == 2**(n+1) - 2 for n in range(1, 26)))
ok("電通大4(iv) S_n=(n-1)2^n+1", all(Sn(n) == (n-1)*2**n + 1 for n in range(1, 26)))
exact = lambda n: sum(Fraction(k, n+k) for k in range(1, n+1))/n
direct = lambda n: Fraction(2**n, n)*sum(Fraction(k*2**(k-1), (n+k)*2**(n+k-1)) for k in range(1, n+1))
ok("電通大4(v) (2^n/n)Σ a_k/a_(n+k) = (1/n)Σ k/(n+k)", all(exact(n) == direct(n) for n in range(1, 26)))
ok("電通大4(v) 極限 1-log2", abs(float(exact(4000)) - (1 - math.log(2))) < 3e-4,
   f"n=4000 で {float(exact(4000)):.7f} / {1-math.log(2):.7f}")

# ── 模試の見本問題（assets/moshi-sample/moshi-sample.tex）────
# 一般項を解き直すのではなく、S_n と a_n の関係だけから数列を直接作って、
# 載せている一般項と T_n の式に突き合わせる。
seq_m = []
S_m = 0
for n in range(1, 25):
    # S_{n-1} + a_n = S_n = 2 a_n - 3n  →  a_n = S_{n-1} + 3n
    an = S_m + 3 * n
    seq_m.append(an)
    S_m += an
    assert S_m == 2 * an - 3 * n
ok("模試見本(1) a1,a2,a3 = 3,9,21", seq_m[:3] == [3, 9, 21], str(seq_m[:3]))
ok("模試見本(2) a_n=3(2^n-1)", all(seq_m[n-1] == 3*(2**n - 1) for n in range(1, 25)))
ok("模試見本(2) 漸化式 a_(n+1)=2a_n+3",
   all(seq_m[n] == 2*seq_m[n-1] + 3 for n in range(1, 24)))
Tm_direct = lambda n: sum(k * seq_m[k-1] for k in range(1, n+1))
Tm_closed = lambda n: 3*(n-1)*2**(n+1) + 6 - Fraction(3*n*(n+1), 2)
ok("模試見本(3) T_n=3(n-1)2^(n+1)+6-3n(n+1)/2",
   all(Tm_direct(n) == Tm_closed(n) for n in range(1, 25)),
   f"T_1..T_4 = {[Tm_direct(n) for n in range(1, 5)]}")

# ── 京大理系2025 ─────────────────────────────────────────
# どれも、立てた式をたどり直すのではなく別の道で確かめる。
import itertools

# 1問1 … 円周上を全探索して最大最小を取る
vals = [abs(complex(2*math.cos(t), 2*math.sin(t)) - 1j/complex(2*math.cos(t), 2*math.sin(t)))
        for t in (2*math.pi*k/200000 for k in range(200001))]
ok("京大理1問1 最大 5/2", abs(max(vals) - 2.5) < 1e-8, f"全探索 {max(vals):.10f}")
ok("京大理1問1 最小 3/2", abs(min(vals) - 1.5) < 1e-8, f"全探索 {min(vals):.10f}")

# 1問2 … 数値積分
v = quad(lambda x: (x*math.sqrt(x*x+1) + 2*x**3 + 1)/(x*x+1), 0, math.sqrt(3))[0]
ok("京大理1問2(1) 4-2log2+π/3", abs(v - (4 - 2*math.log(2) + math.pi/3)) < 1e-7, f"数値{v:.10f}")
v = quad(lambda x: math.sqrt((1-math.cos(x))/(1+math.cos(x))), 0, math.pi/2)[0]
ok("京大理1問2(2) log2", abs(v - math.log(2)) < 1e-7, f"数値{v:.10f}")

# 2 … N=9z^2=x^6+y^4 の最小を全探索
best = None
for x in range(1, 25):
    for y in range(1, 120):
        N = x**6 + y**4
        if N > 2 * 10**6:
            break
        r = math.isqrt(N)
        if r*r == N and r % 3 == 0 and (best is None or N < best[0]):
            best = (N, x, y, r//3)
ok("京大理2 最小 N=2025", best == (2025, 3, 6, 15), f"全探索 {best}")

# 3 … 接線の傾きを数値微分で取り直し、p(t) を定義どおり作って最大最小を見る
def kyodai_p(t):
    h = 1e-6
    f = lambda x: x*x*math.log(x)
    fp = (f(t+h) - f(t-h))/(2*h)
    g = t*t*math.log(t) - 1/(1 + 2*math.log(t))
    return t - g/(-1/fp)
lo = 1/math.sqrt(math.e)
ps = [kyodai_p(lo + (math.e - lo)*i/100000) for i in range(1, 100001)]
ok("京大理3 最小 -1/(9√e)", abs(min(ps) + 1/(9*math.sqrt(math.e))) < 1e-6, f"全探索{min(ps):.10f}")
ok("京大理3 最大 3e^3", abs(max(ps) - 3*math.e**3) < 1e-2, f"全探索{max(ps):.6f}")

# 4 … 具体のベクトルで、P が平面 LMN 上にあるか（行列式が 0 か）
def det3(u, v, w):
    return (u[0]*(v[1]*w[2]-v[2]*w[1]) - u[1]*(v[0]*w[2]-v[2]*w[0]) + u[2]*(v[0]*w[1]-v[1]*w[0]))
sub = lambda u, v: tuple(u[i]-v[i] for i in range(3))
A, B, C = (1.0, 0.3, -0.2), (0.1, 2.0, 0.4), (-0.3, 0.5, 1.7)
P = tuple(0.25*A[i] + 0.5*B[i] + 0.75*C[i] for i in range(3))
flat = True
for i in range(1, 60):
    for j in range(1, 60):
        s_, t_ = 0.2 + i*0.08, 0.2 + j*0.08
        rest = 4 - 1/s_ - 2/t_
        if abs(rest) < 1e-9:
            continue
        u_ = 3/rest
        L = tuple(s_*x for x in A); M = tuple(t_*x for x in B); N = tuple(u_*x for x in C)
        if abs(det3(sub(M, L), sub(N, L), sub(P, L))) > 1e-9:
            flat = False
ok("京大理4(1) P=(a+2b+3c)/4 が平面LMN上", flat)
V = abs(det3(A, B, C))/6
VP = abs(det3(sub(A, P), sub(B, P), sub(C, P)))/6
ok("京大理4(2) 四面体PABC = V/2", abs(VP - V/2) < 1e-12, f"V={V:.8f} VP={VP:.8f}")

# 5 … Q を定義どおり作り、双曲線の式を相対誤差で確かめる
worst, xmax = 0.0, -1e18
for i in range(1, 100000):
    th = -math.pi/4 + (math.pi/2)*i/100000
    d = math.sqrt(2) - 2*math.cos(th)
    x, y = math.sqrt(2)*math.cos(th)/d, math.sqrt(2)*math.sin(th)/d
    lhs = (x + math.sqrt(2))**2 - y*y
    worst = max(worst, abs(lhs - 1)/max(1.0, (x + math.sqrt(2))**2, y*y))
    xmax = max(xmax, x)
ok("京大理5 (x+√2)^2-y^2=1", worst < 1e-12, f"相対誤差の最大 {worst:.2e}")
ok("京大理5 左の分枝（x ≦ -(√2+1)）", xmax <= -(math.sqrt(2)+1) + 1e-9, f"x の最大 {xmax:.9f}")

# 6 … 2^n 通りを全探索して Y_n の偶奇を数える
def kyodai_pn(n):
    c = sum(1 for b in itertools.product((0, 1), repeat=n)
            if sum(b[k-1]*b[k] for k in range(1, n)) % 2)
    return Fraction(c, 2**n)
ok("京大理6 p_n=(1-(1/2)^(n//2))/2",
   all(kyodai_pn(n) == Fraction(1, 2)*(1 - Fraction(1, 2**(n//2))) for n in range(2, 17)),
   f"n=2..16 を全探索と照合　p_2={kyodai_pn(2)} p_5={kyodai_pn(5)} p_8={kyodai_pn(8)}")

# ── 東大理系2025 ─────────────────────────────────────────
# 1 … 内分を定義どおり3段階たどって U_t を作り、式と突き合わせる
def todai_U(t):
    A, B, C, D = (0, 0), (0, 1), (1, 1), (1, 0)
    dv = lambda P, Q: ((1-t)*P[0] + t*Q[0], (1-t)*P[1] + t*Q[1])
    P, Q, R = dv(A, B), dv(B, C), dv(C, D)
    return dv(dv(P, Q), dv(Q, R))
ok("東大理1(1) U_t=(3t^2-2t^3, 3t-3t^2)",
   all(abs(todai_U(t)[0] - (3*t*t - 2*t**3)) < 1e-12 and abs(todai_U(t)[1] - (3*t - 3*t*t)) < 1e-12
       for t in (i/500 for i in range(501))))
ar = quad(lambda t: (3*t - 3*t*t)*(6*t - 6*t*t), 0, 1)[0]
ok("東大理1(2) 面積 3/5", abs(ar - 0.6) < 1e-9, f"数値{ar:.10f}")
arc = lambda a: quad(lambda t: math.hypot(6*t - 6*t*t, 3 - 6*t), 0, a)[0]
ok("東大理1(3) 弧長 2a^3-3a^2+3a",
   all(abs(arc(a) - (2*a**3 - 3*a*a + 3*a)) < 1e-6 for a in (0.3, 0.5, 0.7, 1.0)),
   f"a=0.7 数値{arc(0.7):.8f}")

# 2 … n を大きくして極限に近づくか
todai_I = lambda n: n*quad(lambda x: math.log((1 + x**(1/n))/2), 1, 2)[0]
vs = [todai_I(n) for n in (200, 1000, 4000)]
lim = math.log(2) - 0.5
ok("東大理2(2) 極限 log2-1/2", abs(vs[-1] - lim) < 2e-4, f"n=4000 で {vs[-1]:.7f} / 式 {lim:.7f}")
ok("東大理2(2) n を増やすと近づく", all(abs(vs[i+1]-lim) < abs(vs[i]-lim) for i in range(2)))

# 3 … 長方形を座標で組み立てて面積を出す
def todai_S(a, b, th):
    ang = math.pi/3 + th
    return (a*math.cos(ang) + b*math.sin(th)) * (a*math.sin(ang) + b*math.cos(th))
todai_Sf = lambda a, b, th: a*a/2*math.sin(2*th + 2*math.pi/3) + b*b/2*math.sin(2*th) + a*b/2
ok("東大理3(1) S の式",
   all(abs(todai_S(a, b, th) - todai_Sf(a, b, th)) < 1e-12
       for a, b in ((1, 1), (1, 2), (1.3, 1.5)) for th in (0, 0.1, 0.3, math.pi/6)))
def todai_Smax(a, b):
    if b <= math.sqrt(2)*a:
        return a*b/2 + 0.5*math.sqrt(a**4 - a*a*b*b + b**4)
    return math.sqrt(3)*b*b/4 + a*b/2
ok("東大理3(2) 最大値の場合分け",
   all(abs(max(todai_S(a, b, math.pi/6*i/50000) for i in range(50001)) - todai_Smax(a, b)) < 1e-6
       for a, b in ((1, 1), (1, 1.4), (1, 2), (1.5, 4))))

# 4 … 平方数になる n を全探索して個数を数える
def todai_Na(a):
    return sum(1 for n in range(1, a+1)
               if n*n + n - a >= 0 and math.isqrt(n*n + n - a)**2 == n*n + n - a)
def todai_prime(m):
    return m >= 2 and all(m % p for p in range(2, math.isqrt(m)+1))
ok("東大理4(1) 平方数なら n ≦ a",
   all(not (n > a and (n*n+n-a) >= 0 and math.isqrt(n*n+n-a)**2 == n*n+n-a)
       for a in range(1, 200) for n in range(1, 260)))
ok("東大理4(2) N_a=1 ⟺ 4a+1 が素数",
   all((todai_Na(a) == 1) == todai_prime(4*a+1) for a in range(1, 400)),
   "a=1..399 を全探索と照合")

# 6 … 反転の像と、その外での実部の最大最小
# θ=π は z=0 になり C から除かれている点なので飛ばす
ok("東大理6(1) C 上で Re(1/z)=1",
   all(abs((1/z).real - 1) < 1e-9
       for z in (0.5 + 0.5*complex(math.cos(2*math.pi*k/4000), math.sin(2*math.pi*k/4000))
                 for k in range(1, 4000))
       if abs(z) > 1e-9))
bad = 0
for i in range(400):
    for j in range(400):
        s_, t_ = -20 + i*0.1, -20 + j*0.1
        if abs(s_ - t_) < 1e-12:
            continue
        w = (1 + s_*1j)**2 + (1 + t_*1j)**2
        if w.real >= 2 - w.imag**2/8 - 1e-9:
            bad += 1
ok("東大理6(2) 像は放物線の左側のみ", bad == 0, f"外れ {bad} 点")
# 主張する最大最小の点が、まず条件をみたしているか
re_inv = lambda x, y: x/(x*x + y*y)
outside = lambda x, y: y*y >= 16 - 8*x - 1e-12          # (2) の範囲に属さない
ok("東大理6(3) γ=2 は範囲外で Re=1/2",
   outside(2.0, 0.0) and abs(re_inv(2.0, 0.0) - 0.5) < 1e-12)
ok("東大理6(3) γ=-4±4√3i は範囲外で Re=-1/16",
   outside(-4.0, 4*math.sqrt(3)) and abs(re_inv(-4.0, 4*math.sqrt(3)) + 1/16) < 1e-12)
# そのうえで、条件をみたす点がこの2つを超えないか（格子の刻みぶんの余裕を見る）
over = under = 0
for i in range(0, 4001):
    x = -200 + i*(260/4000)
    for k in range(0, 2001):
        y = k*0.06
        if not outside(x, y) or x*x + y*y < 1e-12:
            continue
        v = re_inv(x, y)
        if v > 0.5 + 1e-9: over += 1
        if v < -1/16 - 1e-9: under += 1
ok("東大理6(3) 1/2 を超える点はない", over == 0, f"超えた点 {over}")
ok("東大理6(3) -1/16 を下回る点はない", under == 0, f"下回った点 {under}")

# 5 … まだ公開していない。成立条件だけ記録として確かめておく
def todai_valid(A):
    b = list(A)
    for i in range(len(b)-1):
        if b[i] > b[i+1]: b[i], b[i+1] = b[i+1], b[i]
    for i in range(len(b)-2, -1, -1):
        if b[i] > b[i+1]: b[i], b[i+1] = b[i+1], b[i]
    return b == sorted(b)
import itertools as _it
_c = {n: sum(1 for p in _it.permutations(range(1, n+1)) if todai_valid(p)) for n in range(2, 9)}
ok("東大理5 c_n = 4c_(n-1) - 2c_(n-2)（未公開・記録のみ）",
   all(_c[n] == 4*_c[n-1] - 2*_c[n-2] for n in range(4, 9)),
   f"c_2..c_8 = {[_c[n] for n in range(2, 9)]}")

# ── 東大理系2024 ─────────────────────────────────────────
# 1 … 角の条件を arccos で直接判定したものと、答えの不等式が一致するか
def t24_direct(x, y):
    r = math.hypot(x, y)
    if r < 1e-15:
        return False
    a1 = math.acos(max(-1, min(1, (-y) / (math.sqrt(2) * r))))
    nb = math.sqrt(x * x + (y + 1) ** 2 + 1)
    a2 = math.acos(max(-1, min(1, (y + 2) / (math.sqrt(2) * nb))))
    return a1 >= 2 * math.pi / 3 - 1e-12 and a2 <= math.pi / 6 + 1e-12


def t24_claim(x, y):
    if abs(x) < 1e-15 and abs(y) < 1e-15:
        return False
    return x * x + (y - 1) ** 2 / 3 <= 1 + 1e-12 and y >= abs(x) - 1e-12

bad = 0
for i in range(601):
    x = -1.6 + i * 3.2 / 600
    for k in range(601):
        y = -1.2 + k * 4.4 / 600
        if t24_direct(x, y) != t24_claim(x, y):
            # 境界の刻み幅ぶんの食い違いは数えない
            if min(abs(x * x + (y - 1) ** 2 / 3 - 1), abs(y - abs(x))) > 5e-3 and math.hypot(x, y) > 5e-3:
                bad += 1
ok("東大理24-1 領域は 楕円かつ y≧|x|（原点を除く）", bad == 0, f"食い違い {bad} 点")
ok("東大理24-1 (1,1) で両方の角がちょうど等号",
   abs((-1) / 2 + 0.5) < 1e-12 and abs(3 / (math.sqrt(6) * math.sqrt(2)) - math.sqrt(3) / 2) < 1e-12)

# 2 … f を数値積分し、f'=2arctan x - π/4 と最大最小を別経路で
def t24_f(x):
    g = lambda t: abs(t - x) / (1 + t * t)
    return quad(g, 0.0, x, 2001)[0] + quad(g, x, 1.0, 2001)[0]

ok("東大理24-2(1) f'(tanα)=2α-π/4（数値微分と一致）",
   all(abs((t24_f(v + 1e-5) - t24_f(v - 1e-5)) / 2e-5 - (2 * math.atan(v) - math.pi / 4)) < 1e-6
       for v in (0.2, 0.5, 0.8)))
ok("東大理24-2(2) tan(π/8)=√2-1", abs(math.tan(math.pi / 8) - (math.sqrt(2) - 1)) < 1e-12)
_g = [(t24_f(i / 800), i / 800) for i in range(801)]
_mn, _amn = min(_g)
_mx, _amx = max(_g)
ok("東大理24-2(3) 最小は log((1+√2)/2)",
   abs(_mn - math.log((1 + math.sqrt(2)) / 2)) < 1e-6 and abs(_amn - (math.sqrt(2) - 1)) < 2e-3,
   f"格子 {_mn:.8f} at {_amn}")
ok("東大理24-2(3) 最大は π/4-½log2（x=1）",
   abs(_mx - (math.pi / 4 - 0.5 * math.log(2))) < 1e-6 and abs(_amx - 1.0) < 1e-9)

# 3 … 8点の上の推移を分数のまま追う
_pts = [(2, 1), (2, -1), (-2, 1), (-2, -1), (1, 2), (1, -2), (-1, 2), (-1, -2)]
_ix = {p: i for i, p in enumerate(_pts)}
_mv = [(lambda a, b: (a, -b), Fraction(1, 3)), (lambda a, b: (-a, b), Fraction(1, 3)),
       (lambda a, b: (b, a), Fraction(1, 6)), (lambda a, b: (-b, -a), Fraction(1, 6))]
_v = [Fraction(0)] * 8
_v[_ix[(2, 1)]] = Fraction(1)
_sym = _fit = True
for n in range(1, 15):
    _w = [Fraction(0)] * 8
    for i, p in enumerate(_pts):
        if _v[i]:
            for fn, pr in _mv:
                _w[_ix[fn(*p)]] += _v[i] * pr
    _v = _w
    if _v[_ix[(2, 1)]] != _v[_ix[(-2, -1)]]:
        _sym = False
    _claim = Fraction(0) if n % 2 else Fraction(1, 4) * (1 + Fraction(1, 3 ** n))
    if _v[_ix[(2, 1)]] != _claim:
        _fit = False
ok("東大理24-3(2) (2,1) と (-2,-1) の確率は n=1..14 で一致", _sym)
ok("東大理24-3(3) p_n = (1/4)(1+1/3^n)（偶数）／0（奇数）", _fit)

# 4 … 円の作り方を幾何に戻して確かめ、解の個数を数える
_s2 = math.sqrt(2)
_f4 = lambda x: -(_s2 / 4) * x * x + 4 * _s2
_c4 = lambda t: t ** 3 / 4 - 3 * t
_r4 = lambda t: t ** 6 / 16 - (15 / 8) * t ** 4 + 12 * t * t + 32
ok("東大理24-4(1) 中心→接点 と 接線 が直交",
   all(abs((t - _c4(t)) + (-(_s2 / 2) * t) * _f4(t)) < 1e-9 for t in (0.5, 1.0, 2.0, 3.0, 3.5, 3.9)))
ok("東大理24-4(1) r^2 は中心と接点の距離の2乗",
   all(abs((t - _c4(t)) ** 2 + _f4(t) ** 2 - _r4(t)) < 1e-9 for t in (0.5, 1.0, 2.0, 3.0, 3.5, 3.9)))
ok("東大理24-4(1) r^2 = (t^2-16)^2(t^2+2)/16",
   all(abs(_r4(t) - (t * t - 16) ** 2 * (t * t + 2) / 16) < 1e-9 for t in (0.5, 1.0, 2.0, 3.0, 3.5, 3.9)))
_h4 = lambda t: -(3 / 8) * t ** 4 + (3 / 2) * t ** 3 + 3 * t * t - 18 * t + 23
ok("東大理24-4(2) h(t)=r^2-(3-c)^2",
   all(abs(_h4(t) - (_r4(t) - (3 - _c4(t)) ** 2)) < 1e-9 for t in (0.7, 1.9, 2.6, 3.4)))


def _t24_count(a):
    s = a * a
    cnt = 0
    prev = None
    for i in range(1, 200000):
        t = 4 * i / 200000
        val = _h4(t) - s
        if prev is not None and prev * val < 0:
            cnt += 1
        prev = val
    return cnt

ok("東大理24-4(2) a<√5 で1個", all(_t24_count(a) == 1 for a in (0.3, 1.0, 2.0, 2.23)))
ok("東大理24-4(2) √5<a<7√2/4 で3個", all(_t24_count(a) == 3 for a in (2.24, 2.3, 2.4, 2.47)))
ok("東大理24-4(2) a=√5 の解は t=2（重解）と t=2√3",
   abs(_h4(2.0) - 5) < 1e-12 and abs(_h4(2 * math.sqrt(3)) - 5) < 1e-9)

# 5 … 断面の半径を走査して面積を作り、体積を数値積分で
def _t24_area(x, M=600):
    k = 1 - x
    zm = min(x, 1 - x)
    if zm <= 0:
        return 0.0
    rs = [(k - zm * j / M) ** 2 + (zm * j / M) ** 2 for j in range(M + 1)]
    return math.pi * (max(rs) - min(rs))

_V = sum(_t24_area(i / 4000) for i in range(4001)) / 4000
ok("東大理24-5 体積は π/9", abs(_V - math.pi / 9) < 1e-5, f"数値積分 {_V:.8f} / π/9 = {math.pi/9:.8f}")

# 6 … 素数になる n を全探索
def _isp(m):
    if m < 2:
        return False
    if m % 2 == 0:
        return m == 2
    d = 3
    while d * d <= m:
        if m % d == 0:
            return False
        d += 2
    return True

ok("東大理24-6(1) n = -7, -3, 1",
   [n for n in range(-400, 400) if _isp(n ** 3 + 10 * n * n + 20 * n)] == [-7, -3, 1])
_worst = 0
_three = 0
for a in range(-120, 121):
    for b in range(-120, 121):
        cand = {1, -1}
        for kk in (1, -1):
            D = a * a - 4 * (b - kk)
            if D >= 0:
                rr = math.isqrt(D)
                if rr * rr == D:
                    for sg in (1, -1):
                        num = -a + sg * rr
                        if num % 2 == 0:
                            cand.add(num // 2)
        c = sum(1 for n in cand if _isp(n ** 3 + a * n * n + b * n))
        _worst = max(_worst, c)
        if c == 3:
            _three += 1
ok("東大理24-6(2) 素数になる n は高々3個（241^2 通りの (a,b) で確認）", _worst == 3,
   f"最大 {_worst} 個／ちょうど3個になる組 {_three} 通り")

# ── 東大理系2023 ─────────────────────────────────────────
import itertools as _it23
import random as _rnd23

# 1 … 置換とは別に、|sin(x^2)| をそのまま数値積分してはさみうちを確かめる
_f23 = lambda x: abs(math.sin(x * x))
ok("東大理23-1(1) 1/√((k+1)π) ≦ A_k ≦ 1/√(kπ)",
   all(1 / math.sqrt((k + 1) * math.pi) <= quad(_f23, math.sqrt(k * math.pi), math.sqrt((k + 1) * math.pi), 8001)[0]
       <= 1 / math.sqrt(k * math.pi) for k in (1, 2, 5, 20, 100)))
_B = lambda n: quad(_f23, math.sqrt(n * math.pi), math.sqrt(2 * n * math.pi), 60001)[0] / math.sqrt(n)
ok("東大理23-1(2) lim B_n = 2(√2-1)/√π",
   abs(_B(400) - 2 * (math.sqrt(2) - 1) / math.sqrt(math.pi)) < 1e-6,
   f"B_400 = {_B(400):.8f}")

# 2 … 12 か所への置き方を全探索して数え上げ
_tot = _norr = _both = 0
for _pos in _it23.combinations(range(12), 4):
    _rest = [i for i in range(12) if i not in _pos]
    for _bp in _it23.combinations(_rest, 3):
        _tot += 1
        _a = sorted(_pos)
        _b = sorted(_bp)
        if any(_a[i + 1] - _a[i] == 1 for i in range(3)):
            continue
        _norr += 1
        if not any(_b[i + 1] - _b[i] == 1 for i in range(2)):
            _both += 1
ok("東大理23-2(1) p = 14/55", Fraction(_norr, _tot) == Fraction(14, 55), f"{_norr}/{_tot}")
ok("東大理23-2(2) q = 103/168", Fraction(_both, _norr) == Fraction(103, 168), f"{_both}/{_norr}")

# 3 … 接線が切り取る長さを傾きから直接計算し、単調性で境目を探す
def _L23(a, m):
    c = a - math.sqrt(1 + m * m)
    d = m * m + 4 * c
    return math.sqrt(1 + m * m) * math.sqrt(d) if d > 0 else -1.0

def _mono23(a):
    v = [_L23(a, i * 0.004) for i in range(3000)]
    return all(v[i + 1] > v[i] - 1e-15 for i in range(len(v) - 1))

ok("東大理23-3(1) cos^2θ-sinθ の最大は 5/4",
   abs(max(1 - s * s - s for s in [(-1000 + i) / 1000 for i in range(2001)]) - 1.25) < 1e-9)
ok("東大理23-3(2) a < 11/8 でのみ L が単調でなくなる",
   all(not _mono23(a) for a in (1.26, 1.30, 1.35, 1.3749)) and all(_mono23(a) for a in (1.375, 1.38, 1.5, 2.0)))

# 4 … 成分計算と、三角形 OHB の走査
_dot23 = lambda u, v: sum(p * q for p, q in zip(u, v))
_P23 = (0, -1, 1)
ok("東大理23-4(1) P=(0,-1,1)",
   _dot23(_P23, (2, 0, 0)) == 0 and _dot23(_P23, (1, 1, 1)) == 0 and _dot23(_P23, (1, 2, 3)) == 1)
_H23 = (Fraction(4, 3), Fraction(2, 3), Fraction(2, 3))
ok("東大理23-4(2) OH = OA/3 + 2OB/3",
   _H23 == tuple(Fraction(1, 3) * a + Fraction(2, 3) * b for a, b in zip((2, 0, 0), (1, 1, 1)))
   and _dot23([h - p for h, p in zip(_H23, _P23)], (-1, 1, 1)) == 0)
_Q23 = (1.5, -1.0, 1.0)
_Hf = (4 / 3, 2 / 3, 2 / 3)
_mn = 1e9
_mx = -1e9
for _i in range(301):
    for _j in range(301 - _i):
        _s, _t = _i / 300, _j / 300
        _X = (_s * _Hf[0] + _t, _s * _Hf[1] + _t, _s * _Hf[2] + _t)
        _d = math.dist(_X, _Q23)
        _mn = min(_mn, _d)
        _mx = max(_mx, _d)
ok("東大理23-4(3) √11/2 ≦ r ≦ √17/2",
   abs(_mn - math.sqrt(11) / 2) < 1e-4 and abs(_mx - math.sqrt(17) / 2) < 1e-9,
   f"走査 {_mn:.7f} 〜 {_mx:.7f}")

# 5 … h^49 を f で割った余りを有理数のまま計算する
_F23 = [Fraction(-2), Fraction(5), Fraction(-4), Fraction(1)]  # (x-1)^2(x-2) 昇冪


def _pmul23(a, b):
    r = [Fraction(0)] * (len(a) + len(b) - 1)
    for i, x in enumerate(a):
        if x:
            for j, y in enumerate(b):
                r[i + j] += x * y
    return r


def _pmod23(a):
    a = a[:]
    while len(a) > 3:
        d = len(a) - 1
        c = a[d]
        if c:
            for k in range(4):
                a[d - 3 + k] -= c * _F23[k]
        a.pop()
    while len(a) < 3:
        a.append(Fraction(0))
    return a


def _ppow23(p, e):
    r = [Fraction(1), Fraction(0), Fraction(0)]
    b = _pmod23(p[:])
    while e:
        if e & 1:
            r = _pmod23(_pmul23(r, b))
        b = _pmod23(_pmul23(b, b))
        e >>= 1
    return r


def _h2_23(a, b):
    h = [Fraction(b), Fraction(a), Fraction(1)]
    return _ppow23(_ppow23(h, 7), 7), h

_sols23 = sorted({(a, b) for a in (Fraction(n, 2) for n in range(-16, 17))
                  for b in (Fraction(n, 2) for n in range(-16, 17))
                  if (lambda r: r[0] == r[1])(_h2_23(a, b))})
ok("東大理23-5(2) (a,b) = (-2,0), (-2,1) だけ",
   _sols23 == [(Fraction(-2), Fraction(0)), (Fraction(-2), Fraction(1))], f"{_sols23}")

# 6 … 条件を線分と面の交点から直接判定し、当方の形と突き合わせる
_S3 = math.sqrt(3)


def _hits23(A, B, endpoint_ok):
    for ax, val in ((0, 1.0), (0, -1.0), (1, 1.0), (1, -1.0), (2, -1.0)):
        d = B[ax] - A[ax]
        if abs(d) < 1e-15:
            continue
        t = (val - A[ax]) / d
        if t < 1e-12 or t > 1 + 1e-12:
            continue
        X = tuple(A[k] + t * (B[k] - A[k]) for k in range(3))
        if max(abs(X[k]) for k in range(3)) > 1 + 1e-9 or X[2] >= 1 - 1e-12:
            continue
        if endpoint_ok and t > 1 - 1e-9:
            continue
        return True
    return False


_lip23 = [p for i in range(201) for s in [(-1 + 2 * i / 200)]
          for p in ((1.0, s, 1.0), (-1.0, s, 1.0), (s, 1.0, 1.0), (s, -1.0, 1.0))]


def _bruteW23(p):
    if math.dist((0, 0, 0), p) > _S3:
        return False
    if not _hits23((0, 0, 0), p, True):
        return True
    for N in _lip23:
        if math.dist((0, 0, 0), N) + math.dist(N, p) <= _S3 + 1e-9:
            if not _hits23((0, 0, 0), N, False) and not _hits23(N, p, True):
                return True
    return False


def _formV23(p):
    x, y, z = p
    if max(abs(x), abs(y), abs(z)) <= 1:
        return True
    return math.dist((0, 0, 0), p) <= _S3 and z >= abs(x) and z >= abs(y)


def _formW23(p):
    if _formV23(p):
        return True
    x, y, z = p
    for u, v, ax in ((x - 1, z - 1, y), (-x - 1, z - 1, y), (y - 1, z - 1, x), (-y - 1, z - 1, x)):
        if u > 0 and v < u and abs(ax) <= 1 and math.hypot(u, v) <= math.sqrt(3 - ax * ax) - math.sqrt(2):
            return True
    return False

_rnd23.seed(5)
_bad23 = 0
for _ in range(40000):
    _p = tuple(_rnd23.uniform(-1.75, 1.75) for _ in range(3))
    if _bruteW23(_p) != _formW23(_p) and abs(math.dist((0, 0, 0), _p) - _S3) > 3e-3:
        _bad23 += 1
ok("東大理23-6 条件の直接判定と、導いた形が一致", _bad23 == 0, f"食い違い {_bad23} 点")
_cv = _cw = 0
_M23 = 300000
for _ in range(_M23):
    _p = tuple(_rnd23.uniform(-1.75, 1.75) for _ in range(3))
    if _formV23(_p):
        _cv += 1
        _cw += 1
    elif _formW23(_p):
        _cw += 1
_vol23 = 3.5 ** 3
_al23 = math.asin(1 / _S3)
_V23 = 20 / 3 + 2 * math.sqrt(3) * math.pi / 3
_W23 = _V23 + 8 * math.pi - 9 * math.sqrt(2) * math.pi * _al23
ok("東大理23-6(1) V = 20/3 + 2√3π/3", abs(_cv / _M23 * _vol23 - _V23) < 0.06,
   f"MC {_cv / _M23 * _vol23:.4f} / 式 {_V23:.4f}")
ok("東大理23-6(2) W = 20/3 + (8 + 2√3/3 - 9√2α)π", abs(_cw / _M23 * _vol23 - _W23) < 0.06,
   f"MC {_cw / _M23 * _vol23:.4f} / 式 {_W23:.4f}")

# ── 東大理系2022 ─────────────────────────────────────────
from math import comb as _comb22, gcd as _gcd22
import itertools as _it22

# 1 … f を数値積分で作り、その数値微分と f' の式を比べる
_g22 = lambda t: math.cos(t) * math.log(math.cos(t))
_f22 = lambda x: math.cos(x) * math.log(math.cos(x)) - math.cos(x) + (quad(_g22, 0.0, x, 2001)[0] if x > 0 else 0.0)
ok("東大理22-1(1) f'(x) = log(cos x)(cos x - sin x)",
   all(abs((_f22(v + 1e-6) - _f22(v - 1e-6)) / 2e-6 - math.log(math.cos(v)) * (math.cos(v) - math.sin(v))) < 1e-6
       for v in (0.3, 0.7, 1.2)))
_m22 = min((_f22(i * (math.pi / 2 - 1e-4) / 600), i * (math.pi / 2 - 1e-4) / 600) for i in range(601))
_claim22 = math.log(1 + math.sqrt(2)) - math.sqrt(2) / 2 * math.log(2) - math.sqrt(2)
ok("東大理22-1(2) 最小は log(1+√2) - (√2/2)log2 - √2",
   abs(_m22[0] - _claim22) < 1e-6 and abs(_m22[1] - math.pi / 4) < 3e-3,
   f"格子 {_m22[0]:.8f} at {_m22[1]:.5f} / 式 {_claim22:.8f}")

# 2 … 多倍長整数でそのまま確かめる
_a22 = [0, 1]
for _ in range(15):
    _a22.append(_a22[-1] ** 2 + 1)
ok("東大理22-2(1) 3の倍数番目だけ5の倍数",
   all(_a22[n] % 5 == 0 for n in (3, 6, 9, 12)) and all(_a22[n] % 5 != 0 for n in range(1, 13) if n % 3))
ok("東大理22-2(2) a_n が a_k の倍数 ⟺ n が k の倍数",
   all((_a22[n] % _a22[k] == 0) == (n % k == 0) for k in range(1, 13) for n in range(1, 13)))
ok("東大理22-2(3) 25 で割った余りは 1,2,5 の繰り返し",
   [_a22[n] % 25 for n in range(1, 13)] == [1, 2, 5] * 4)
ok("東大理22-2(3) 最大公約数が3の組では a_m と a_n^2 の最大公約数は 5",
   all(_gcd22(_a22[m], _a22[n] ** 2) == 5 for m, n in ((6, 9), (9, 6), (6, 15), (15, 6), (9, 12)))
   and _gcd22(2022, 8091) == 3)

# 3 … D を格子で走査して「十分離れている」点の面積を直接数える
def _far22(S, T):
    return abs(S[0] - T[0]) >= 1 or abs(S[1] - T[1]) >= 1


def _area22(a, M=700):
    pts = [(0, 0), (3, 0), (3, 3), (a, a * a)]
    c = 0
    for i in range(M):
        x = 3 * (i + 0.5) / M
        for j in range(M):
            y = 3 * (j + 0.5) / M
            if all(_far22((x, y), t) for t in pts):
                c += 1
    return c * 9 / M / M


_fa22 = lambda a: a ** 3 - 2 * a * a - a + 5 if a <= math.sqrt(2) else 2 * a * a + a - 3
# 格子の刻み幅ぶん（3/700 程度）の誤差は許す
ok("東大理22-3(2) f(a) の式が格子での面積と一致",
   all(abs(_area22(a) - _fa22(a)) < 0.02 for a in (1.0, 1.1, 1.3, math.sqrt(2), 1.5, 1.6, math.sqrt(3))))
_mn22 = min((_fa22(1 + i * (math.sqrt(3) - 1) / 5000), 1 + i * (math.sqrt(3) - 1) / 5000) for i in range(5001))
ok("東大理22-3(3) f の最小は a=√2", abs(_mn22[1] - math.sqrt(2)) < 1e-3 and abs(_mn22[0] - (math.sqrt(2) + 1)) < 1e-4,
   f"最小 {_mn22[0]:.6f} at {_mn22[1]:.6f}")

# 4 … 2つの面積を数値積分で比べ、領域の判定を傾きの全探索と照合
def _two_areas22(m, n):
    # x^3 + Px + Q = 0 の3実解を三角関数の公式で直接出す（符号変化を拾う方法だと
    # n=0 のとき x=0 でちょうど 0 になり、根を1つ取りこぼす）
    P = -(1 + m)
    Q = -n
    if 4 * P ** 3 + 27 * Q ** 2 >= 0:
        return None
    rr = 2 * math.sqrt(-P / 3)
    ph = math.acos(max(-1.0, min(1.0, 3 * Q / (P * rr))))
    xs = sorted(rr * math.cos((ph - 2 * math.pi * k) / 3) for k in range(3))
    g = lambda t: (t ** 3 - t) - (m * t + n)
    return quad(g, xs[0], xs[1], 2001)[0], -quad(g, xs[1], xs[2], 2001)[0]

_eq22 = []
for _m, _n in ((2.0, 0.0), (0.0, 0.0), (5.0, 0.0), (2.0, 0.3), (2.0, -0.5), (0.5, 0.1)):
    _r = _two_areas22(_m, _n)
    if _r:
        _eq22.append((_n == 0.0, abs(_r[0] - _r[1]) < 1e-6))
ok("東大理22-4(2) 2つの面積が等しい ⟺ 直線が原点を通る", all(a == b for a, b in _eq22), f"{_eq22}")


def _brute22(X, Y):
    for i in range(-20000, 20001):
        m = i / 200
        if abs(Y - m * X) < 1e-12 and 1 + m > 0:
            return True
    return False

ok("東大理22-4(2) 領域は x(x+y)>0 と原点",
   all((X * (X + Y) > 0 or (X == 0 and Y == 0)) == _brute22(X, Y)
       for X in (-2, -1, 0, 1, 2) for Y in (-3, -1, 0, 1, 3)))

# 5 … 断面積を作って数値積分
def _sec22(z):
    r1 = 2 - 2 * z
    r2 = math.sqrt(max(0.0, 1 - z * z))
    return math.pi * ((r1 + r2) ** 2 - (r1 - r2) ** 2)

_V22 = quad(_sec22, 0.5, 1.0, 40001)[0]
ok("東大理22-5 体積は 4π²/3 - 2√3π",
   abs(_V22 - (4 * math.pi ** 2 / 3 - 2 * math.sqrt(3) * math.pi)) < 1e-6,
   f"数値積分 {_V22:.9f} / 式 {4 * math.pi ** 2 / 3 - 2 * math.sqrt(3) * math.pi:.9f}")

# 6 … 2^N 通りの表裏をすべて並べて X_N を直接計算
_v22 = [(math.cos(2 * k * math.pi / 3), math.sin(2 * k * math.pi / 3)) for k in range(3)]


def _count22(N):
    per = {}
    for bits in _it22.product([0, 1], repeat=N):
        k = 0
        x = y = 0.0
        r = 0
        for b in bits:
            if b:
                x += _v22[k % 3][0]
                y += _v22[k % 3][1]
                r += 1
            else:
                k += 1
        if abs(x) < 1e-9 and abs(y) < 1e-9:
            per[r] = per.get(r, 0) + 1
    return per

_okall22 = True
for _N in (8, 11, 14):
    _per = _count22(_N)
    _pred = {3 * s: _comb22((_N + 1) // 3 - 1, s) ** 3 for s in range((_N + 1) // 3)}
    if _per != {k: v for k, v in _pred.items() if v}:
        _okall22 = False
ok("東大理22-6 場合の数は (C(n,s))^3（N=8,11,14 で全探索と一致）", _okall22)
ok("東大理22-6(1) 確率は 5/128", Fraction(sum(_count22(8).values()), 2 ** 8) == Fraction(5, 128))
ok("東大理22-6(2) C(66,s) の最大は s=33（r=99）",
   max(range(67), key=lambda s: _comb22(66, s)) == 33)

# ── 東大理系2021 ─────────────────────────────────────────
from math import comb as _comb21

# 1 … (a,b) を総当たりで探す判定と、答えの不等式を突き合わせる
_tri21 = lambda a, b: b < 0 and b > a - 2 and b > -a - 2


def _direct21(X, Y, N=1500):
    for i in range(-N, N + 1):
        a = 4 * i / N
        if _tri21(a, Y - X * X - a * X):
            return True
    return False


def _form21(X, Y):
    up = X * X + 2 * abs(X)
    lo = X * X - 2 * abs(X) if abs(X) >= 1 else X * X - 2
    return lo < Y < up

_bad21 = 0
for _i in range(-40, 41):
    X = _i / 15
    for _j in range(-70, 110):
        Y = _j / 15
        if _direct21(X, Y) != _form21(X, Y):
            up = X * X + 2 * abs(X)
            lo = X * X - 2 * abs(X) if abs(X) >= 1 else X * X - 2
            if min(abs(Y - up), abs(Y - lo)) > 0.03:
                _bad21 += 1
ok("東大理21-1(2) 通過範囲は x^2-2|x| 系と x^2+2|x| のあいだ", _bad21 == 0, f"食い違い {_bad21} 点")

# 2 … 係数の式と f(2) の式を、ランダムな値で突き合わせる
import random as _rnd21
_rnd21.seed(21)


def _coef21(al, be, ga):
    return ((be - ga) + (be + ga - 2 * al) * 1j) / 2, (be + ga - 2 * al) * (1 - 1j) / 2, al

_ok21 = True
for _ in range(500):
    _al = complex(_rnd21.uniform(-3, 3), _rnd21.uniform(-3, 3))
    _be = complex(_rnd21.uniform(-3, 3), _rnd21.uniform(-3, 3))
    _ga = complex(_rnd21.uniform(-3, 3), _rnd21.uniform(-3, 3))
    _a, _b, _c = _coef21(_al, _be, _ga)
    if (abs(_a * 0 + _b * 0 + _c - _al) > 1e-9 or abs(_a + _b + _c - _be) > 1e-9
            or abs(_a * 1j * 1j + _b * 1j + _c - _ga) > 1e-9):
        _ok21 = False
ok("東大理21-2(1) a,b,c の式が f(0),f(1),f(i) を再現する", _ok21)

_ok21 = True
for _ in range(500):
    _al, _be, _ga = [_rnd21.uniform(1, 2) for _ in range(3)]
    _a, _b, _c = _coef21(_al, _be, _ga)
    if abs(4 * _a + 2 * _b + _c - complex(3 * _be - _ga - _al, _be + _ga - 2 * _al)) > 1e-9:
        _ok21 = False
ok("東大理21-2(2) f(2) = (3β-γ-α)+(β+γ-2α)i", _ok21)

_hex21 = lambda x, y, e=1e-9: (-2 - e <= x + y <= 5 + e) and (-1 - e <= 2 * x - y <= 7 + e) and (-3 - e <= x - 3 * y <= 6 + e)
ok("東大理21-2(2) 立方体 [1,2]^3 の像は六角形に入る",
   all(_hex21(3 * be - ga - al, be + ga - 2 * al)
       for i in range(21) for j in range(21) for k in range(21)
       for al, be, ga in [(1 + i / 20, 1 + j / 20, 1 + k / 20)]))
_miss21 = 0
for _i in range(-20, 81):
    for _j in range(-40, 41):
        x, y = _i / 20, _j / 20
        if not _hex21(x, y, 0):
            continue
        # 3β-γ-α=x, β+γ-2α=y を α で解く（β=(x+y+3α)/4）
        if not any(1 - 1e-9 <= (x + y + 3 * (1 + k / 400)) / 4 <= 2 + 1e-9
                   and 1 - 1e-9 <= y + 2 * (1 + k / 400) - (x + y + 3 * (1 + k / 400)) / 4 <= 2 + 1e-9
                   for k in range(401)):
            _miss21 += 1
ok("東大理21-2(2) 六角形の点はすべて実現される", _miss21 == 0, f"取りこぼし {_miss21}")

# 3 … 接線と交点、定積分を数値で
_f21 = lambda x: x / (x * x + 3)
_g21 = lambda x: (x + 1) / 8
ok("東大理21-3(1) f'(1)=1/8 と x=-3 が共有点",
   abs((_f21(1 + 1e-7) - _f21(1 - 1e-7)) / 2e-7 - 0.125) < 1e-7 and abs(_f21(-3) - _g21(-3)) < 1e-15)
_I21 = quad(lambda x: (_f21(x) - _g21(x)) ** 2, -3.0, 1.0, 120001)[0]
_c21 = 5 * math.sqrt(3) / 24 * math.pi + math.log(3) / 8 - 7 / 6
ok("東大理21-3(2) 積分は 5√3π/24 + log3/8 - 7/6", abs(_I21 - _c21) < 1e-9,
   f"数値積分 {_I21:.10f} / 式 {_c21:.10f}")

# 4 … 二項係数を多倍長整数で直接
def _v2_21(n):
    e = 0
    while n % 2 == 0:
        n //= 2
        e += 1
    return e

ok("東大理21-4(2) A と B の2の指数が等しい（奇数 K,L が取れる）",
   all(_v2_21(_comb21(4 * a + 1, 4 * b + 1)) == _v2_21(_comb21(a, b))
       for a in range(2, 14) for b in range(1, a)))
ok("東大理21-4(3) a-b が偶数なら 4 で割った余りが等しい",
   all(_comb21(4 * a + 1, 4 * b + 1) % 4 == _comb21(a, b) % 4
       for a in range(2, 16) for b in range(1, a) if (a - b) % 2 == 0))
ok("東大理21-4(4) C(2021,37) を 4 で割った余りは 3",
   _comb21(2021, 37) % 4 == 3 and _comb21(505, 9) % 4 == 3 and _comb21(126, 2) % 4 == 3)

# 5 … f' の零点の個数と、最大の位置
_F21 = lambda th, al: (th + math.sin(th) + al) ** 2 + (math.cos(th) + 3) ** 2


def _argmax21(al, M=40000):
    return max((_F21(math.pi * i / M, al), math.pi * i / M) for i in range(M + 1))[1]


def _nzero21(al, M=40000):
    c = 0
    prev = None
    for i in range(1, M):
        th = math.pi * i / M
        v = (_F21(th + 1e-7, al) - _F21(th - 1e-7, al)) / 2e-7
        if prev is not None and prev * v < 0:
            c += 1
        prev = v
    return c

ok("東大理21-5(1) 0<θ<π に f'=0 がちょうど1つ", all(_nzero21(a) == 1 for a in (0.1, 0.3, 0.6, 1.0, 3.0)))
ok("東大理21-5(2) 最大が π/2 より左にあるのは α < 2-π/2",
   all((_argmax21(a) < math.pi / 2) == (a < 2 - math.pi / 2) for a in (0.1, 0.3, 0.42, 0.44, 0.6, 1.0, 3.0)),
   f"2-π/2 = {2 - math.pi / 2:.5f}")

# 6 … 有理数のまま p を探す
def _fact21(a):
    b = Fraction((a * a + 1) * (a + 2))
    c = -Fraction(4 * a + 3, 4) * Fraction(a * a + 1)
    for num in range(-120, 121):
        for den in (1, 2, 3, 4):
            p = Fraction(num, den)
            if p == 0:
                continue
            if p ** 6 - 4 * c * p ** 2 - b ** 2 == 0:
                return p, (p ** 3 - b) / (2 * p), (p ** 3 + b) / (2 * p)
    return None

ok("東大理21-6(3) 因数分解できる整数 a は 0 だけ",
   [a for a in range(-12, 13) if _fact21(a)] == [0])
ok("東大理21-6(3) a=0 の分解が合っている",
   _fact21(0) == (Fraction(-1), Fraction(3, 2), Fraction(-1, 2)) or
   _fact21(0) == (Fraction(1), Fraction(-1, 2), Fraction(3, 2)),
   f"{_fact21(0)}")
ok("東大理21-6(3) a^2+1 が平方数になる整数は 0 だけ",
   [a for a in range(-1000, 1001) if math.isqrt(a * a + 1) ** 2 == a * a + 1] == [0])

# ── 東大理系2020 ─────────────────────────────────────────
import itertools as _it20
import random as _rnd20

# 1 … 3式の解集合を直接作って下限を見る
def _sol_inf20(a, b, c):
    f = lambda x: (a * x * x + b * x + c > 0) and (b * x * x + c * x + a > 0) and (c * x * x + a * x + b > 0)
    xs = [i / 200 - 5 for i in range(2001) if f(i / 200 - 5)]
    return min(xs) if xs else None

_rnd20.seed(20)
ok("東大理20-1(2) a,b,c がすべて正なら x=-1000 も解",
   all((lambda a, b, c: (a * 1e6 - b * 1000 + c > 0) and (b * 1e6 - c * 1000 + a > 0) and (c * 1e6 - a * 1000 + b > 0))(
       *[_rnd20.uniform(0.1, 3) for _ in range(3)]) for _ in range(300)))
_bad20 = 0
for _ in range(400):
    v = [_rnd20.uniform(0, 3) for _ in range(3)]
    for i in _rnd20.sample(range(3), _rnd20.choice([1, 2])):
        v[i] = 0.0
    m = _sol_inf20(*v)
    if m is not None and abs(m) > 0.011:
        _bad20 += 1
ok("東大理20-1(3) 1つ以上が0なら解集合の下限は 0（p=0）", _bad20 == 0, f"外れ {_bad20}")

# 2 … 三角形を1つ固定して格子で面積を数える
_A20, _B20, _C20 = (0.0, 0.0), (1.0, 0.0), (0.0, 2.0)
_tri20 = lambda P, Q, R: abs((Q[0] - P[0]) * (R[1] - P[1]) - (Q[1] - P[1]) * (R[0] - P[0])) / 2
_S20 = lambda X: _tri20(_A20, _B20, X) + _tri20(_B20, _C20, X) + _tri20(_C20, _A20, X)


def _area20(pred, M=700, lo=-4.0, hi=5.0):
    c = 0
    for i in range(M):
        x = lo + (hi - lo) * (i + 0.5) / M
        for j in range(M):
            y = lo + (hi - lo) * (j + 0.5) / M
            if pred((x, y)):
                c += 1
    return c * (hi - lo) ** 2 / M / M

ok("東大理20-2 △ABC = 1", abs(_tri20(_A20, _B20, _C20) - 1) < 1e-12)
_a20 = _area20(lambda X: 2 <= _S20(X) <= 3)
ok("東大理20-2 面積は 15/2", abs(_a20 - 7.5) < 0.05, f"格子 {_a20:.4f}")
ok("東大理20-2 S≦k の面積は (3k^2-1)/2",
   all(abs(_area20(lambda X, k=k: _S20(X) <= k) - (3 * k * k - 1) / 2) < 0.05 for k in (1, 2, 3)))

# 3 … 媒介変数から直接
_X20 = lambda t: (1 + t) * math.sqrt(1 + t)
_Y20 = lambda t: 3 * (1 + t) * math.sqrt(1 - t)
_f20 = lambda t: math.hypot(_X20(t), _Y20(t))
ok("東大理20-3(1) y/x は単調減少",
   all(_Y20(t) / _X20(t) > _Y20(t + 1e-4) / _X20(t + 1e-4) for t in [-0.99 + i * 0.002 for i in range(990)]))
_m20 = max((_f20(-1 + 2 * i / 50000), -1 + 2 * i / 50000) for i in range(50001))
ok("東大理20-3(2) 最大は 3√6/2（t=1/2）",
   abs(_m20[0] - 3 * math.sqrt(6) / 2) < 1e-7 and abs(_m20[1] - 0.5) < 1e-3,
   f"{_m20[0]:.9f} at t={_m20[1]:.5f}")
_D20 = quad(lambda t: _Y20(t) * 1.5 * math.sqrt(1 + t), -1.0, 1.0, 60001)[0]
ok("東大理20-3(3) D の面積は 9π/4", abs(_D20 - 9 * math.pi / 4) < 1e-6,
   f"数値積分 {_D20:.8f} / 9π/4 = {9 * math.pi / 4:.8f}")
ok("東大理20-3(3) 掃過面積 = D + 27π/8 = 45π/8",
   abs((9 * math.pi / 4 + 27 * math.pi / 8) - 45 * math.pi / 8) < 1e-12)

# 4 … a_{n,k} を定義どおり数え上げる
def _ank20(n, k):
    return sum(2 ** sum(c) for c in _it20.combinations(range(n), k))

ok("東大理20-4 a_4,3 = 120（問題文の例）", _ank20(4, 3) == 120)
ok("東大理20-4(1) a_n,2 = (2^n-1)(2^n-2)/3",
   all(_ank20(n, 2) == (2 ** n - 1) * (2 ** n - 2) // 3 for n in range(2, 12)))
ok("東大理20-4(3) a_{n+1,k+1}/a_{n,k} = 2^k(2^{n+1}-1)/(2^{k+1}-1)",
   all(Fraction(_ank20(n + 1, k + 1), _ank20(n, k)) == Fraction(2 ** k * (2 ** (n + 1) - 1), 2 ** (k + 1) - 1)
       for n in range(1, 9) for k in range(1, n + 1)))

# 5 … 断面の形から体積を、モンテカルロで
def _inU20(x, y, z):
    if z < 0 or z > 2:
        return False
    lam = z / 2
    cx = min(max(x, 0.0), lam)
    return math.hypot(x - cx, y) <= 1 - lam

_rnd20.seed(205)
_cnt20 = 0
_M20 = 400000
for _ in range(_M20):
    if _inU20(_rnd20.uniform(-1.1, 1.6), _rnd20.uniform(-1.1, 1.1), _rnd20.uniform(0, 2)):
        _cnt20 += 1
_v20 = _cnt20 / _M20 * 2.7 * 2.2 * 2
ok("東大理20-5(2) 体積は 2(π+1)/3", abs(_v20 - 2 * (math.pi + 1) / 3) < 0.02,
   f"MC {_v20:.5f} / 式 {2 * (math.pi + 1) / 3:.5f}")
# 凸包の点が本当に線分 AP 上にあるか（S は円錐）
# 円錐の判定には、半直線を刻んで探すぶんの余裕（1e-6）を持たせる
_inS20 = lambda x, y, z: -1e-9 <= z <= 2 + 1e-9 and math.hypot(x, y) <= (2 - z) / 2 + 1e-6
_bad5 = 0
for _ in range(3000):
    x, y, z = _rnd20.uniform(-1.1, 1.6), _rnd20.uniform(-1.1, 1.1), _rnd20.uniform(0, 2)
    if not _inU20(x, y, z):
        continue
    if not any(_inS20(1 + (x - 1) * 4000 / i, y * 4000 / i, 2 + (z - 2) * 4000 / i) for i in range(1, 4001)):
        _bad5 += 1
ok("東大理20-5(2) 断面の式で入る点は線分 AP 上にある", _bad5 == 0, f"外れ {_bad5}")

# 6 … 解の個数を直接数える
def _n20(s, q, M=200000):
    F = lambda th: math.sin(th) * math.cos(th) - s * math.sin(th) + q * math.cos(th)
    vs = [F(2 * math.pi * i / M) for i in range(M)]
    c = 0
    for i in range(M):
        a, b = vs[i], vs[(i + 1) % M]
        if a == 0.0 or a * b < 0:
            c += 1
    return c

_rnd20.seed(206)
_in20 = []
for _ in range(25):
    d = _rnd20.uniform(0, 0.4995)
    th = _rnd20.uniform(0, 2 * math.pi)
    _in20.append(_n20(d * math.cos(th), d * math.sin(th)))
ok("東大理20-6(2) 距離 < 1/2 ならつねに4個以上", all(c >= 4 for c in _in20), f"{sorted(set(_in20))}")
_out20 = sum(1 for _ in range(25)
             if _n20(*(lambda d, th: (d * math.cos(th), d * math.sin(th)))(
                 _rnd20.uniform(0.52, 0.8), _rnd20.uniform(0, 2 * math.pi))) < 4)
ok("東大理20-6(2) 距離 > 1/2 では4個未満になる点がある", _out20 > 0, f"25点中 {_out20} 点")
_c20 = 1 / (2 * math.sqrt(2))
ok("東大理20-6(2) c=1/(2√2) で c+√(c²+1)=√2（境目）",
   abs(_c20 + math.sqrt(_c20 * _c20 + 1) - math.sqrt(2)) < 1e-12 and abs(math.sqrt(2) * _c20 - 0.5) < 1e-12)
ok("東大理20-6(2) 縮閉線上で √(2x²+y²) の最小は 1/2",
   abs(min(math.hypot(math.cos(u) ** 3, math.sin(u) ** 3) for u in [i * math.pi / 2 / 20000 for i in range(20001)]) - 0.5) < 1e-9)

# ── 東大理系2019 ─────────────────────────────────────────
from math import gcd as _gcd19
import random as _rnd19

# 1 … 被積分関数をそのまま数値積分
_f19 = lambda x: (x * x + x / math.sqrt(1 + x * x)) * (1 + x / ((1 + x * x) * math.sqrt(1 + x * x)))
_I19 = quad(_f19, 0.0, 1.0, 120001)[0]
_c19 = 5 * math.sqrt(2) / 2 + math.pi / 8 - 35 / 12
ok("東大理19-1 積分は 5√2/2 + π/8 - 35/12", abs(_I19 - _c19) < 1e-9,
   f"数値積分 {_I19:.10f} / 式 {_c19:.10f}")

# 2 … q を細かく動かし、面積条件を毎回確かめたうえで DR/AQ を全探索
_best19 = (-1.0, 0.0)
_worst19 = (9.0, 0.0)
_area_ok19 = True
for _i in range(1, 60001):
    q = _i / 60000
    if q < 2 / 3 - 1e-15:
        continue
    p = 2 / (3 * q)
    if p > 1 + 1e-12:
        continue
    r = 4 / (3 * q) - 2 / (3 * q * q)
    if r < -1e-12 or r > 1 + 1e-12:
        continue
    if abs(0.5 * p * q - 1 / 3) > 1e-9 or abs(0.5 * abs(p + q * r - q * p) - 1 / 3) > 1e-9:
        _area_ok19 = False
    v = r / q
    if v > _best19[0]:
        _best19 = (v, q)
    if v < _worst19[0]:
        _worst19 = (v, q)
ok("東大理19-2 2つの三角形の面積はどちらも 1/3", _area_ok19)
ok("東大理19-2 最大 64/81、最小 2/3",
   abs(_best19[0] - 64 / 81) < 1e-8 and abs(_worst19[0] - 2 / 3) < 1e-8,
   f"最大 {_best19[0]:.9f} at q={_best19[1]:.5f} / 最小 {_worst19[0]:.9f}")

# 3 … 八面体を不等式で書き、面の符号から切られる面の数を数える
def _inOcta19(x, y, z, p):
    if z >= 0:
        return z <= 2 and abs(x - p * z / 2) + abs(y) <= 2 - z + 1e-12
    return z >= -2 and abs(x) + abs(y) <= 2 + z + 1e-12


def _nfaces19(p):
    V = {"A": (2, 0, 0), "B": (0, 2, 0), "C": (-2, 0, 0), "D": (0, -2, 0), "E": (0, 0, -2), "P": (p, 0, 2)}
    faces = [("P", "A", "B"), ("P", "B", "C"), ("P", "C", "D"), ("P", "D", "A"),
             ("E", "A", "B"), ("E", "B", "C"), ("E", "C", "D"), ("E", "D", "A")]
    g = lambda v: V[v][0] - V[v][2] - 1
    return sum(1 for f in faces if max(g(v) for v in f) > 1e-12 and min(g(v) for v in f) < -1e-12)

ok("東大理19-3(2) 八角形になるのは 3<p<4",
   all(_nfaces19(p) == 6 for p in (2.2, 2.5, 2.9, 3.0)) and all(_nfaces19(p) == 8 for p in (3.001, 3.2, 3.6, 3.9)))


def _area19(p, M=900):
    c = 0
    for i in range(M):
        z = 2.0 * (i + 0.5) / M
        for j in range(M):
            y = 2.5 * (j + 0.5) / M
            if _inOcta19(z + 1, y, z, p):
                c += 1
    return c * 2.5 * 2.0 / M / M

ok("東大理19-3(3) 面積は (7p-18)/(p(p-2))",
   all(abs(_area19(p) - (7 * p - 18) / (p * (p - 2))) < 0.01 for p in (3.2, 3.5, 3.9)),
   f"p=3.5: 格子 {_area19(3.5):.5f} / 式 {(7 * 3.5 - 18) / (3.5 * 1.5):.5f}")

# 4 … 最大公約数と平方数を多倍長整数で
ok("東大理19-4(1) d_n は n が奇数なら 2、偶数なら 1",
   all(_gcd19(n * n + 1, 5 * n * n + 9) == (2 if n % 2 else 1) for n in range(1, 300)))
ok("東大理19-4(2) (n²+1)(5n²+9) は平方数にならない",
   all(math.isqrt((n * n + 1) * (5 * n * n + 9)) ** 2 != (n * n + 1) * (5 * n * n + 9) for n in range(1, 60000)))
ok("東大理19-4(2) n 奇数のとき (5n²+9)/2 を 4 で割った余りは 3",
   all((5 * n * n + 9) // 2 % 4 == 3 for n in range(1, 400, 2)))

# 5 … a_n を二分法で出し、a_n^n = √(a_n cos a_n) を確かめる
def _an19(n):
    lo, hi = 0.0, 1.0
    for _ in range(200):
        m = (lo + hi) / 2
        if m ** (2 * n - 1) - math.cos(m) < 0:
            lo = m
        else:
            hi = m
    return (lo + hi) / 2

ok("東大理19-5(3) a_n^n = √(a_n cos a_n)",
   all(abs(_an19(n) ** n - math.sqrt(_an19(n) * math.cos(_an19(n)))) < 1e-12 for n in (1, 2, 5, 20, 100, 2000)))
ok("東大理19-5(3) a=1, b=√cos1",
   abs(_an19(5000) - 1) < 1e-3 and abs(_an19(5000) ** 5000 - math.sqrt(math.cos(1))) < 1e-3,
   f"a_5000 = {_an19(5000):.8f}, a^n = {_an19(5000) ** 5000:.8f}, √cos1 = {math.sqrt(math.cos(1)):.8f}")
_a19 = _an19(20000)
_cc19 = (math.cos(1) - math.sin(1)) / (2 * math.sqrt(math.cos(1)))
ok("東大理19-5(3) c = (cos1-sin1)/(2√cos1)",
   abs((_a19 ** 20000 - math.sqrt(math.cos(1))) / (_a19 - 1) - _cc19) < 1e-4,
   f"n=20000 で {(_a19 ** 20000 - math.sqrt(math.cos(1))) / (_a19 - 1):.8f} / 式 {_cc19:.8f}")

# 6 … 条件をみたす根の組を作って確かめる
_rnd19.seed(1900)
_bad19 = 0
for _ in range(1500):
    y = _rnd19.uniform(0.05, 3) * _rnd19.choice([1, -1])
    if _rnd19.random() < 0.5:
        r1 = math.sqrt(1 + y * y) * _rnd19.choice([1, -1])
        r2 = -r1
        u = complex(1, y)
    else:
        sq = math.sqrt(1 + y * y)
        r1, r2 = 1 + sq, 1 - sq
        u = complex(0, y)
    roots = [r1, r2, u, u.conjugate()]
    e1 = sum(roots)
    e2 = sum(roots[i] * roots[j] for i in range(4) for j in range(i + 1, 4))
    e3 = sum(roots[i] * roots[j] * roots[k] for i in range(4) for j in range(i + 1, 4) for k in range(j + 1, 4))
    e4 = roots[0] * roots[1] * roots[2] * roots[3]
    a = e3.real / 2
    b = e4.real
    v = r1 * u + r2 * u.conjugate()
    S = r1 + u
    if not (abs(e1 - 2) < 1e-9 and abs(e2) < 1e-9 and abs(v.real) < 1e-9 and abs(v.imag) > 1e-9
            and abs(b + a * a) < 1e-7 and abs((S.real - 1) ** 2 - S.imag ** 2 - 1) < 1e-9):
        _bad19 += 1
ok("東大理19-6 b=-a² と α+β が (x-1)²-y²=1 の上にある", _bad19 == 0, f"外れ {_bad19}")

# ── 東大文系2025 ─────────────────────────────────────────
from collections import defaultdict as _dd25
import random as _rnd25

# 1 … 法線のもう一方の交点を2回たどる
_nx25 = lambda a: -a - 1 / (2 * a)
_best25 = min((_nx25(_nx25(i * 4 / 200000)), i * 4 / 200000) for i in range(1, 200001))
ok("東大文25-1(2) R の x 座標の最小は 5√2/4（a=1/√2）",
   abs(_best25[0] - 5 * math.sqrt(2) / 4) < 1e-8 and abs(_best25[1] - 1 / math.sqrt(2)) < 1e-3,
   f"{_best25[0]:.9f} at a={_best25[1]:.6f}")

# 2 … 3頂点までの距離の最小を、辺の上と三角形の中で最大化する
def _tri25(th):
    h, m = math.cos(th / 2), math.sin(th / 2)
    return (0.0, 0.0), (h, -m), (h, m)


def _s_scan25(th, M=4000):
    A, B, C = _tri25(th)
    best = 0.0
    for X, Y in ((A, B), (A, C), (B, C)):
        for i in range(M + 1):
            P = (X[0] + (Y[0] - X[0]) * i / M, X[1] + (Y[1] - X[1]) * i / M)
            best = max(best, min(math.dist(P, Q) for Q in (A, B, C)))
    return best


def _t_scan25(th, M=260):
    A, B, C = _tri25(th)
    best = 0.0
    for i in range(M + 1):
        for j in range(M + 1 - i):
            u, v = i / M, j / M
            P = (A[0] + u * (B[0] - A[0]) + v * (C[0] - A[0]), A[1] + u * (B[1] - A[1]) + v * (C[1] - A[1]))
            best = max(best, min(math.dist(P, Q) for Q in (A, B, C)))
    return best


def _s25(th):
    if th <= math.pi / 3:
        return 0.5
    if th <= math.pi / 2:
        return math.sin(th / 2)
    return 1 / (2 * math.sin(th / 2))


_t25 = lambda th: 1 / (2 * math.cos(th / 2)) if th <= math.pi / 2 else 1 / (2 * math.sin(th / 2))
_ths25 = (math.pi / 6, math.pi / 3, 0.9, math.pi / 2, 2.0, 2 * math.pi / 3, 2.8, 3.0)
ok("東大文25-2 s の式が辺の上の走査と一致",
   all(abs(_s_scan25(th) - _s25(th)) < 2e-3 for th in _ths25))
ok("東大文25-2 t の式が三角形の走査と一致",
   all(abs(_t_scan25(th) - _t25(th)) < 6e-3 for th in _ths25))
ok("東大文25-2(1)(2) θ=π/3 で s=1/2・t=√3/3、θ=2π/3 で s=t=√3/3",
   abs(_s25(math.pi / 3) - 0.5) < 1e-12 and abs(_t25(math.pi / 3) - math.sqrt(3) / 3) < 1e-12
   and abs(_s25(2 * math.pi / 3) - math.sqrt(3) / 3) < 1e-12
   and abs(_t25(2 * math.pi / 3) - math.sqrt(3) / 3) < 1e-12)

# 3 … 右端2個の色を状態として分数のまま推移させる
def _sim25(n):
    st = _dd25(Fraction)
    st[("W", "W")] = Fraction(1)
    for _ in range(n):
        nx = _dd25(Fraction)
        for (x, y), p in st.items():
            for z in ("W", "B"):
                if z != y and z == x:
                    nx[(z, z)] += p / 2
                else:
                    nx[(y, z)] += p / 2
        st = nx
    return st

_ok25a = _ok25b = True
for n in range(1, 9):
    st = _sim25(n)
    A = sum(p for (x, _y), p in st.items() if x == "W")
    P = st[("W", "W")]
    if A != Fraction(1, 2) + Fraction(1, 2 ** n):
        _ok25a = False
    if P != Fraction(1, 3) + Fraction(1, 2 ** (n + 1)) + Fraction((-1) ** n, 3 * 2 ** (n + 1)):
        _ok25b = False
ok("東大文25-3(2) 右から2番目が白は 1/2 + 1/2^n", _ok25a)
ok("東大文25-3(3) 右から1,2番目がともに白の式", _ok25b)
ok("東大文25-3(1) n=3 で 5/8",
   sum(p for (x, _y), p in _sim25(3).items() if x == "W") == Fraction(5, 8))

# 手順をそのまま回すシミュレーションでも
_rnd25.seed(25)
_c25 = _cc25 = 0
_M25 = 120000
for _ in range(_M25):
    row = ["W", "W"]
    for _ in range(3):
        z = _rnd25.choice("WB")
        row.append(z)
        if z != row[-2] and z == row[-3]:
            row[-2] = z
    if row[-2] == "W":
        _c25 += 1
    if row[-1] == "W" and row[-2] == "W":
        _cc25 += 1
ok("東大文25-3 手順をそのまま回した結果とも合う（n=3）",
   abs(_c25 / _M25 - 0.625) < 0.01 and abs(_cc25 / _M25 - 0.375) < 0.01,
   f"{_c25 / _M25:.5f}, {_cc25 / _M25:.5f}")

# 4 … S(a) を数値積分して最大を探す
def _S25(a, M=30000):
    tot = 0.0
    for i in range(M):
        x = -1 + 2 * (i + 0.5) / M
        hi = -0.5 * x * x + 2
        lo = abs(x * x + a)
        if hi > lo:
            tot += hi - lo
    return tot * 2 / M

_bm25 = max((_S25(-2 + 4 * i / 4000, 3000), -2 + 4 * i / 4000) for i in range(4000))
ok("東大文25-4 S の最大は 19/6（a=-1/4）",
   abs(_bm25[0] - 19 / 6) < 2e-3 and abs(_bm25[1] + 0.25) < 2e-3,
   f"{_bm25[0]:.6f} at a={_bm25[1]:.5f}")
ok("東大文25-4 S(0)=3, S(-1)=7/3, S(-2)=1/3",
   abs(_S25(0.0) - 3) < 1e-4 and abs(_S25(-1.0) - 7 / 3) < 1e-4 and abs(_S25(-2.0) - 1 / 3) < 1e-4)

# ── 東大文系2024 ─────────────────────────────────────────
import itertools as _it24b

# 1 … a,b,c の式から放物線を作り、2点を通ることと接線の傾きを確かめる
def _para24(s):
    return -1 / (2 * s), 0.0, (s * s + 1) / (2 * s)

_ok24 = True
for _th in (0.3, 0.6, math.pi / 4, 1.2, 1.5):
    _s, _c = math.sin(_th), math.cos(_th)
    _a, _b, _cc = _para24(_s)
    _f = lambda x: _a * x * x + _b * x + _cc
    _fp = lambda x: 2 * _a * x + _b
    if (abs(_f(_c) - _s) > 1e-12 or abs(_f(-_c) - _s) > 1e-12
            or abs(_fp(_c) + _c / _s) > 1e-12 or abs(_fp(-_c) - _c / _s) > 1e-12):
        _ok24 = False
ok("東大文24-1(1) a,b,c の式が2点と共通接線をみたす", _ok24)
_A24 = lambda s: 2 * (s * s + 1) ** 1.5 / (3 * s)
ok("東大文24-1(2) 面積は 2(s²+1)^(3/2)/(3s)",
   all(abs(_A24(s) - quad(lambda x, s=s: -x * x / (2 * s) + (s * s + 1) / (2 * s),
                          -math.sqrt(s * s + 1), math.sqrt(s * s + 1), 20001)[0]) < 1e-7
       for s in (0.2, 0.5, 1 / math.sqrt(2), 0.9)))
_mn24 = min((_A24(i / 100000), i / 100000) for i in range(1, 100000))
ok("東大文24-1(3) A の最小は √3（s=1/√2）",
   abs(_mn24[0] - math.sqrt(3)) < 1e-8 and abs(_mn24[1] - 1 / math.sqrt(2)) < 1e-4,
   f"{_mn24[0]:.9f} at s={_mn24[1]:.6f}")

# 2 … 多倍長整数で直接
ok("東大文24-2(1) 最小の n は 28",
   5 ** 27 < 10 ** 19 < 5 ** 28 and min(n for n in range(1, 60) if 5 ** n > 10 ** 19) == 28)
ok("東大文24-2(2) 最小の m も 28",
   5 ** 27 + 4 ** 27 < 10 ** 19 < 5 ** 28 + 4 ** 28
   and min(m for m in range(1, 60) if 5 ** m + 4 ** m > 10 ** 19) == 28)
ok("東大文24-2(2) (4/5)^9 < 1/4 と 5^28/4 < 10^19",
   Fraction(4, 5) ** 9 < Fraction(1, 4) and Fraction(5 ** 28, 4) < 10 ** 19)

# 3 … 角を内積から直接計算して q の式を確かめる
def _ang24(U, V, W):
    a = (U[0] - V[0], U[1] - V[1])
    b = (W[0] - V[0], W[1] - V[1])
    return math.acos(max(-1, min(1, (a[0] * b[0] + a[1] * b[1]) / math.hypot(*a) / math.hypot(*b))))

_q24 = lambda p: p * (3 - p * p) / (2 * (1 - p * p))
ok("東大文24-3(1) q の式で ∠OAP = ∠PMQ",
   all(abs(_ang24((0, 0), (0, 1), (p / 500, 0)) - _ang24((p / 500, 0), (p / 1000, 0.5), (_q24(p / 500), 0))) < 1e-9
       for p in range(1, 500)))
_p24 = (math.sqrt(7) - 2) / 3
ok("東大文24-3(2) q=1/3 となるのは p=(√7-2)/3", abs(_q24(_p24) - 1 / 3) < 1e-12, f"p={_p24:.7f}")
_lo24 = [p / 2000 for p in range(1, 2000) if p / 2000 / 2 > (_q24(p / 2000) - p / 2000) / 4]
ok("東大文24-3(3) S>T は 0<p<√15/5",
   abs(max(_lo24) - math.sqrt(15) / 5) < 1e-3 and len(_lo24) == int(math.sqrt(15) / 5 * 2000),
   f"上限 {max(_lo24)} / √15/5 = {math.sqrt(15) / 5:.7f}")

# 4 … 4点の選び方をすべて列挙し、偏角の最大の隙間で判定
def _p24n(n):
    good = tot = 0
    for S in _it24b.combinations(range(n), 4):
        tot += 1
        ths = sorted(2 * math.pi * j / n for j in S)
        gaps = [ths[i + 1] - ths[i] for i in range(3)] + [ths[0] + 2 * math.pi - ths[3]]
        if max(gaps) < math.pi:
            good += 1
    return Fraction(good, tot)

ok("東大文24-4 p_n = (n+1)/(2(n-2))",
   all(_p24n(n) == Fraction(n + 1, 2 * (n - 2)) for n in (5, 7, 9, 11, 13, 15, 21)))

# ── 東大文系2023 ─────────────────────────────────────────
# 1 … 解から直接計算した値と、k の式・最小値を突き合わせる
def _e23(k):
    d = math.sqrt(1 + 4 * k)
    a, b = (-1 + d) / 2, (-1 - d) / 2
    return a ** 3 / (1 - b) + b ** 3 / (1 - a)

ok("東大文23-1 式 2u+15+24/u（u=k-2）が解からの値と一致",
   all(abs(_e23(k) - (2 * (k - 2) + 15 + 24 / (k - 2))) < 1e-7 for k in (2.5, 3, 4, 6, 10)))
_b23 = min((_e23(2 + i / 20000), 2 + i / 20000) for i in range(1, 600000))
ok("東大文23-1 最小は 15+8√3（k=2+2√3）",
   abs(_b23[0] - (15 + 8 * math.sqrt(3))) < 1e-7 and abs(_b23[1] - (2 + 2 * math.sqrt(3))) < 1e-3,
   f"{_b23[0]:.9f} at k={_b23[1]:.6f}")

# 2 … 距離を数値積分して g(a) の式と比べる
_f23 = lambda t: 3 * abs(t * (2 - t)) / math.sqrt(5)
_g23 = lambda a: ((a ** 3 - 3 * a * a + 4) if a <= 0 else (-a ** 3 + 3 * a * a + 4)) / math.sqrt(5)
ok("東大文23-2(1) g(a) の式が数値積分と一致",
   all(abs(quad(_f23, -1.0, a, 40001)[0] - _g23(a)) < 1e-7 for a in (-0.5, 0.0, 0.7, 1.5, 2.0)))
_gf23 = [(_g23(2 * i / 20000) - _f23(2 * i / 20000), 2 * i / 20000) for i in range(20001)]
ok("東大文23-2(2) 最大 8/√5（a=2）、最小 (8-4√2)/√5（a=2-√2）",
   abs(max(_gf23)[0] - 8 / math.sqrt(5)) < 1e-7 and abs(max(_gf23)[1] - 2) < 1e-3
   and abs(min(_gf23)[0] - (8 - 4 * math.sqrt(2)) / math.sqrt(5)) < 1e-7
   and abs(min(_gf23)[1] - (2 - math.sqrt(2))) < 1e-3,
   f"最大 {max(_gf23)[0]:.8f} / 最小 {min(_gf23)[0]:.8f} at a={min(_gf23)[1]:.5f}")

# 3 … 理科2023第2問と同じ問題なので、同じ全探索で確かめる
ok("東大文23-3 p=14/55, q=103/168（理科第2問と同じ）",
   Fraction(_norr, _tot) == Fraction(14, 55) and Fraction(_both, _norr) == Fraction(103, 168))

# 4 … 条件から出した座標が全条件をみたし、体積が √11/9 になるか
_A23 = (-0.5, 0.0, 0.0)
_B23 = (0.5, 0.0, 0.0)
_h23 = math.sqrt(11 / 12)
_y23 = 2 / math.sqrt(3)
_C23 = (0.0, _y23, _h23)
_D23 = (0.0, _y23, -_h23)
_O23 = (0.0, math.sqrt(3) / 2, 0.0)


def _cos23(P, Q, R):
    a = [P[i] - Q[i] for i in range(3)]
    b = [R[i] - Q[i] for i in range(3)]
    return sum(a[i] * b[i] for i in range(3)) / math.dist(P, Q) / math.dist(R, Q)

ok("東大文23-4 4点が単位球面上で条件をすべてみたす",
   all(abs(math.dist(_O23, P) - 1) < 1e-12 for P in (_A23, _B23, _C23, _D23))
   and abs(math.dist(_A23, _B23) - 1) < 1e-12
   and all(abs(math.dist(X, Y) - math.sqrt(2.5)) < 1e-12
           for X, Y in ((_A23, _C23), (_B23, _C23), (_A23, _D23), (_B23, _D23)))
   and abs(_cos23(_A23, _C23, _B23) - 0.8) < 1e-12 and abs(_cos23(_A23, _D23, _B23) - 0.8) < 1e-12)
_u23 = [_C23[i] - _A23[i] for i in range(3)]
_v23 = [_D23[i] - _A23[i] for i in range(3)]
_w23 = [_B23[i] - _A23[i] for i in range(3)]
_det23 = (_w23[0] * (_u23[1] * _v23[2] - _u23[2] * _v23[1])
          - _w23[1] * (_u23[0] * _v23[2] - _u23[2] * _v23[0])
          + _w23[2] * (_u23[0] * _v23[1] - _u23[1] * _v23[0]))
ok("東大文23-4(1)(2) 面積 3/4、体積 √11/9",
   abs(0.5 * 2.5 * 0.6 - 0.75) < 1e-12 and abs(abs(_det23) / 6 - math.sqrt(11) / 9) < 1e-12,
   f"体積 {abs(_det23) / 6:.9f}")

# ---------------------------------------------------------------- 東大文系2022
# 第1問：原点を通る2接線が直交するとき b=(a^2+1)/4、半径比は |a+2√b|
def _bunkei22_radii(a):
    b = (a * a + 1) / 4
    s = math.sqrt(b)
    m1, m2 = a - 2 * s, a + 2 * s
    P1 = (-s, 2 * b - a * s)
    P2 = (s, 2 * b + a * s)
    ax = -a / 2
    # 接点を通る法線（傾きは -1/m1 = m2、-1/m2 = m1）と軸 x = ax の交点が中心
    c1 = (ax, P1[1] + m2 * (ax - P1[0]))
    c2 = (ax, P2[1] + m1 * (ax - P2[0]))
    return math.dist(c1, P1), math.dist(c2, P2), m1, m2, b


_perp22 = max(abs(_bunkei22_radii(i / 100000)[2] * _bunkei22_radii(i / 100000)[3] + 1)
              for i in range(-300000, 300001, 7))
ok("東大文22-1(1) b=(a²+1)/4 なら2接線はつねに直交", _perp22 < 1e-9,
   f"傾きの積と -1 の最大のずれ {_perp22:.2e}")
_ratio22 = max(abs((lambda r: r[1] / r[0] - abs(r[3]))(_bunkei22_radii(i / 100000)))
               for i in range(-300000, 300001, 7) if i)
ok("東大文22-1(2) 半径比 r₂/r₁ は |a+2√b| に一致", _ratio22 < 1e-9,
   f"最大のずれ {_ratio22:.2e}")
_sol22 = [i / 100000 for i in range(-300000, 300001)
          if abs((lambda r: r[1] / r[0])(_bunkei22_radii(i / 100000)) - 2) < 1e-7]
_r22 = _bunkei22_radii(0.75)
ok("東大文22-1(2) a = 3/4（r₁=√5/4, r₂=√5/2）",
   _sol22 == [0.75] and abs(_r22[0] - math.sqrt(5) / 4) < 1e-12
   and abs(_r22[1] - math.sqrt(5) / 2) < 1e-12,
   f"解 {_sol22}  r₁={_r22[0]:.9f} r₂={_r22[1]:.9f}")

# 第2問：法線が3点で交わる α の範囲と u の値域
def _bunkei22_disc(al):
    T = 3 * al * al - 1
    if T == 0:
        return None
    m = -1 / T
    return al * al - 4 * (al * al - 1 - m), m


_good22 = [i / 100000 for i in range(-100000, 100001)
           if (_d := _bunkei22_disc(i / 100000)) and _d[0] > 0]
ok("東大文22-2(1) 3交点になるのは |α| < 1/√3",
   abs(min(_good22) + 1 / math.sqrt(3)) < 2e-5 and abs(max(_good22) - 1 / math.sqrt(3)) < 2e-5
   and len(_good22) == max(0, int(round((max(_good22) - min(_good22)) * 100000)) + 1),
   f"{min(_good22):.5f} 〜 {max(_good22):.5f}（1/√3 = {1 / math.sqrt(3):.5f}）")
_bad22 = 0
for _i in range(-57000, 57001):
    _al = _i / 100000
    _D, _m = _bunkei22_disc(_al)
    _rt = math.sqrt(_D)
    _b, _c = (-_al - _rt) / 2, (-_al + _rt) / 2
    if abs((_b * _b + _b * _c + _c * _c - 1) - _m) > 1e-9:
        _bad22 += 1
ok("東大文22-2(2) β²+βγ+γ²-1 は法線の傾き m に等しい（≠0）", _bad22 == 0,
   f"11万4001点で不一致 {_bad22} 件")
_u22 = [4 * (i / 200000) ** 3 - 3 * (i / 200000) ** 2 + 1 for i in range(-115000, 115001)]
ok("東大文22-2(3) u の範囲は -4√3/9 < u ≦ 1",
   abs(max(_u22) - 1) < 1e-12 and -4 * math.sqrt(3) / 9 < min(_u22) < -0.75,
   f"最大 {max(_u22):.9f}、最小 {min(_u22):.6f}（下限 {-4 * math.sqrt(3) / 9:.6f} は含まない）")

# 第3問：a_{n+1} = a_n^2 + n(n+2)、a_1 = 4
def _a22mod(N, M):
    x = 4 % M
    for n in range(1, N):
        x = (x * x + n * (n + 2)) % M
    return x


_cyc22 = [_a22mod(n, 3) for n in range(1, 25)]
ok("東大文22-3(1) a_n mod 3 は 1,1,0,0,0,2 の周期6",
   _cyc22 == [1, 1, 0, 0, 0, 2] * 4 and _a22mod(2022, 3) == 2 and 2022 % 6 == 0,
   f"先頭12項 {_cyc22[:12]}  a_2022 mod 3 = {_a22mod(2022, 3)}")
_g22 = math.gcd(2022 * 2024, 2023 * 2025)
ok("東大文22-3(2) 最大公約数は 1（d | 3 かつ a_2022 ≡ 2 (mod 3)）",
   _g22 == 3 and _a22mod(2022, 3) == 2 and _a22mod(2023, 3) == 1 and _a22mod(2024, 3) == 1
   and 2022 * 2024 == 4092528 and 2023 * 2025 == 4096575,
   f"gcd(2022·2024, 2023·2025) = {_g22}")

# 第4問：硬貨で v_k を足していく歩み。X_N = O ⟺ 余り類ごとの表の本数が等しい
_v22 = [(math.cos(2 * k * math.pi / 3), math.sin(2 * k * math.pi / 3)) for k in range(3)]


def _walk22(N):
    """2^N 通りを全探索して、原点に戻る並びを表の回数別に数える。"""
    per = {}
    for bits in itertools.product((0, 1), repeat=N):
        k = 0
        x = y = 0.0
        r = 0
        for b in bits:
            if b:
                x += _v22[k % 3][0]
                y += _v22[k % 3][1]
                r += 1
            else:
                k += 1
        if abs(x) < 1e-9 and abs(y) < 1e-9:
            per[r] = per.get(r, 0) + 1
    return per


_p22 = _walk22(5)
ok("東大文22-4(1) N=5 で原点に戻るのは2通り、確率 1/16",
   sum(_p22.values()) == 2 and _p22 == {0: 1, 3: 1}
   and Fraction(sum(_p22.values()), 2 ** 5) == Fraction(1, 16),
   f"表の回数別の内訳 {_p22}")
_fit22 = []
for _N, _r in ((5, 3), (8, 6), (11, 9), (11, 3), (14, 6), (14, 12)):
    _t = _N - _r
    if (_t + 1) % 3:
        continue
    _n = (_t + 1) // 3
    _s = _r // 3
    _fit22.append(_walk22(_N).get(_r, 0) == math.comb(_s + _n - 1, _n - 1) ** 3)
ok("東大文22-4(2) 数え方（各類 n 個の和を s にする重複組合せの3乗）が全探索と一致",
   all(_fit22) and len(_fit22) == 6, f"確かめた (N, r) の組 {len(_fit22)} 通り")
ok("東大文22-4(2) N=98・表90回の確率は 31³/2⁸⁶",
   math.comb(32, 2) == 496 and math.comb(32, 2) ** 3 == 122023936
   and Fraction(496 ** 3, 2 ** 98) == Fraction(31 ** 3, 2 ** 86) == Fraction(29791, 2 ** 86),
   f"496³ = {math.comb(32, 2) ** 3}")

# ---------------------------------------------------------------- 東大文系2021
# 第1問：y = ax^3 - 2x と単位円の共有点が6個になる a の範囲
def _circle21(a, n=400_000):
    """単位円を角度で刻み、sinθ -(a cos³θ - 2cosθ) の符号変化で共有点を数える。"""
    cnt = 0
    prev = None
    for i in range(n + 1):
        th = 2 * math.pi * i / n
        c, s_ = math.cos(th), math.sin(th)
        v = s_ - (a * c ** 3 - 2 * c)
        if prev is not None and (v == 0.0 or prev * v < 0):
            cnt += 1
        prev = v
    return cnt


ok("東大文21-1 共有点6個の境目は 50/27 と 2",
   _circle21(50 / 27 - 0.01) == 2 and _circle21(50 / 27 + 0.001) == 6
   and _circle21(1.9) == 6 and _circle21(2.0) == 2 and _circle21(2.1) == 2,
   f"50/27 = {50 / 27:.6f}")
_ext21 = []
for _a in (1.8, 1.9, 2.1):
    _g = lambda t, a=_a: a * a * t ** 3 - 4 * a * t * t + 5 * t
    _ext21.append(abs(_g(1 / _a) - 2 / _a) < 1e-12 and abs(_g(5 / (3 * _a)) - 50 / (27 * _a)) < 1e-12)
ok("東大文21-1 g(t) の極大 2/a・極小 50/(27a)", all(_ext21),
   f"a=1.9 で極大 {1.9 ** 2 * (1 / 1.9) ** 3 - 4 * 1.9 * (1 / 1.9) ** 2 + 5 / 1.9:.6f}")

# 第2問：1 を含む N 個の選び方のうち、条件1・条件2 をみたすものの個数
def _count21(N):
    c1 = c2 = 0
    for rest in itertools.combinations(range(2, 2 * N + 1), N - 1):
        S = (1,) + rest
        st = set(S)
        if not any(x + 1 in st for x in S):
            c1 += 1
        if any(all(l + i in st for i in range(N - 2)) for l in range(1, N + 4)):
            c2 += 1
    return c1, c2


_res21 = [_count21(N) for N in (5, 6, 7, 8, 9)]
ok("東大文21-2(1) 条件1をみたす選び方は N 通り",
   all(c1 == N for (c1, _), N in zip(_res21, (5, 6, 7, 8, 9))),
   f"N=5..9 で {[c[0] for c in _res21]}")
ok("東大文21-2(2) 条件2をみたす選び方は (N+1)(3N+2)/2 通り",
   all(c2 == (N + 1) * (3 * N + 2) // 2 for (_, c2), N in zip(_res21, (5, 6, 7, 8, 9))),
   f"N=5..9 で {[c[1] for c in _res21]}")

# 第3問：2x^2+ax+b=0 の解の配置と、放物線の通過範囲
_rnd21b = random.Random(20210303)
_bad21 = 0
for _ in range(200_000):
    _a, _b = _rnd21b.uniform(-4, 4), _rnd21b.uniform(-4, 1)
    _D = _a * _a - 8 * _b
    _direct = False
    if _D > 0:
        _r1 = (-_a - math.sqrt(_D)) / 4
        _r2 = (-_a + math.sqrt(_D)) / 4
        _direct = -1 < _r1 < 0 and 0 < _r2 < 1
    if _direct != (abs(_a) - 2 < _b < 0):
        _bad21 += 1
ok("東大文21-3(1) (a,b) の範囲は |a|-2 < b < 0", _bad21 == 0,
   f"解を直接求めた判定との不一致 {_bad21} 件／20万点")
_bad21b = 0
for _ in range(60_000):
    _x, _y = _rnd21b.uniform(-3, 3), _rnd21b.uniform(-6, 14)
    _got = False
    for _i in range(4001):  # a を動かして (a,b) が三角形の内部に入るか総当たり
        _a = -2 + 4 * _i / 4000
        _b = _y - _x * _x - _a * _x
        if abs(_a) - 2 < _b < 0:
            _got = True
            break
    _pred = _x * _x - 2 * max(1.0, abs(_x)) < _y < _x * _x + 2 * abs(_x)
    if _pred != _got and min(abs(_y - (_x * _x + 2 * abs(_x))),
                             abs(_y - (_x * _x - 2 * max(1.0, abs(_x))))) > 0.01:
        _bad21b += 1
ok("東大文21-3(2) 通過範囲は x²-2max(1,|x|) < y < x²+2|x|", _bad21b == 0,
   f"総当たりとの不一致（境界から0.01以上離れた点）{_bad21b} 件／6万点")

# 第4問は理科第4問と同じ問題。2021C37 ≡ 3 (mod 4) をもう一度だけ確かめておく。
ok("東大文21-4 2021C37 を 4 で割った余りは 3（理科第4問と同じ問題）",
   math.comb(2021, 37) % 4 == 3 and math.comb(505, 9) % 4 == 3 and math.comb(126, 2) % 4 == 3,
   f"126C2 = {math.comb(126, 2)}")

# ---------------------------------------------------------------- 東大文系2020
# 第1問：b=4a^3 のとき y=(x+a)(x-2a)^2。囲まれた部分の格子点をそのまま数える
def _lat20(a):
    n = 0
    for x in range(-10, 11):
        if -a < x < 2 * a:
            v = (x + a) * (x - 2 * a) ** 2
            if v > 0:
                n += math.ceil(v) - 1
    return n


_lo20 = (1 / 4) ** (1 / 3)
_hi20 = (1 / 2) ** (1 / 3)
ok("東大文20-1 格子点ちょうど1個の境目は (1/4)^(1/3) と (1/2)^(1/3)",
   _lat20(_lo20 - 1e-6) == 0 and _lat20(_lo20 + 1e-6) == 1
   and _lat20(_hi20 - 1e-6) == 1 and _lat20(_hi20 + 1e-6) == 2
   and _lat20(0.4) == 0 and _lat20(0.6) == 0 and _lat20(0.9) == 3,
   f"(1/4)^(1/3) = {_lo20:.9f}、(1/2)^(1/3) = {_hi20:.9f}")
ok("東大文20-1 x³-3ax²+4a³ = (x+a)(x-2a)²",
   all(abs((x + 0.7) * (x - 1.4) ** 2 - (x ** 3 - 2.1 * x * x + 4 * 0.343)) < 1e-12
       for x in (-2, 0, 1, 3, 5)))

# 第2問：4×4 の16点から5点。8本の直線のうち点を含まないものの本数で数える
_c20a = _c20b = 0
for _S in itertools.combinations([(i, j) for i in range(4) for j in range(4)], 5):
    _e = (4 - len({p[0] for p in _S})) + (4 - len({p[1] for p in _S}))
    if _e == 2:
        _c20a += 1
    elif _e == 0:
        _c20b += 1
ok("東大文20-2(1) 点を含まない直線がちょうど2本なのは 1824 通り", _c20a == 1824,
   f"全探索 {_c20a}（192+192+1440 = {192 + 192 + 1440}）")
_inc20 = sum((-1) ** (i + j) * math.comb(4, i) * math.comb(4, j)
             * math.comb((4 - i) * (4 - j), 5) for i in range(5) for j in range(5))
ok("東大文20-2(2) 8本すべてが点を含むのは 432 通り", _c20b == 432 and _inc20 == 432,
   f"全探索 {_c20b}／包除原理 {_inc20}")

# 第3問：半直線の通過領域と、正三角形がとれる a の範囲
ok("東大文20-3(1) OP の傾き t+4/t-2 の最小は 2（t=2）",
   abs(min((i / 10000) + 4 / (i / 10000) - 2 for i in range(1, 200000)) - 2) < 1e-9)
_b20 = math.atan(2.0)
_iv20 = ((math.tan(_b20 - math.pi / 3), math.tan(math.pi / 6)),
         (math.tan(_b20 + math.pi / 3), math.tan(5 * math.pi / 6)))


def _tri20(a, n=400_000):
    """C 上の点を細かくとり、±60° 回した向きが ℓ と一致するものがあるか。"""
    al = math.atan(a)
    for i in range(n + 1):
        t = i / n * 12
        th = math.atan2(t * t - 2 * t + 4, t)
        for sgn in (1, -1):
            d = (th + sgn * math.pi / 3 - al) % math.pi
            if min(d, math.pi - d) < 2e-5:
                return True
    return False


ok("東大文20-3(2) a の範囲は2区間 [(5√3-8)/11, 1/√3] と [-(8+5√3)/11, -1/√3]",
   abs(_iv20[0][0] - (5 * math.sqrt(3) - 8) / 11) < 1e-12
   and abs(_iv20[0][1] - 1 / math.sqrt(3)) < 1e-12
   and abs(_iv20[1][0] + (8 + 5 * math.sqrt(3)) / 11) < 1e-12
   and abs(_iv20[1][1] + 1 / math.sqrt(3)) < 1e-12
   and all(_tri20(a) == any(lo <= a <= hi for lo, hi in _iv20)
           for a in (-2.0, -1.6, -1.5, -1.0, -0.6, -0.5, 0.0, 0.03, 0.07, 0.3, 0.57, 0.6, 1.0)),
   f"[{_iv20[0][0]:.6f}, {_iv20[0][1]:.6f}] ∪ [{_iv20[1][0]:.6f}, {_iv20[1][1]:.6f}]")

# 第4問：a_{n,k} は 2^0,…,2^{n-1} の基本対称式
def _a20(n, k):
    return sum(math.prod(2 ** m for m in c) for c in itertools.combinations(range(n), k))


def _polydiv20(A, B):
    A = [Fraction(x) for x in A]
    q = [Fraction(0)] * (len(A) - len(B) + 1)
    for i in range(len(A) - len(B), -1, -1):
        c = A[i + len(B) - 1] / B[-1]
        q[i] = c
        for j, b in enumerate(B):
            A[i + j] -= c * b
    return q, [x for x in A if x != 0]


ok("東大文20-4(1) a_{n,2} = (2^n-1)(2^n-2)/3",
   _a20(4, 3) == 120 and all(_a20(n, 2) == (2 ** n - 1) * (2 ** n - 2) // 3 for n in range(2, 13)),
   f"a_4,3 = {_a20(4, 3)}（問題文の例）、a_5,2 = {_a20(5, 2)}")
_div20 = []
for _n in range(1, 10):
    _f = [_a20(_n, k) for k in range(_n + 1)]
    _f1 = [_a20(_n + 1, k) for k in range(_n + 2)]
    _q, _r = _polydiv20(_f1, _f)
    _q2, _r2 = _polydiv20(_f1, [c * 2 ** k for k, c in enumerate(_f)])
    _div20.append(_q == [1, 2 ** _n] and not _r and _q2 == [1, 1] and not _r2)
ok("東大文20-4(2) f_{n+1}/f_n = 1+2ⁿx、f_{n+1}/f_n(2x) = 1+x", all(_div20),
   f"n=1..9 を多項式の割り算で確認")
ok("東大文20-4(3) a_{n+1,k+1}/a_{n,k} = 2^k(2^{n+1}-1)/(2^{k+1}-1)",
   all(Fraction(_a20(n + 1, k + 1), _a20(n, k))
       == Fraction(2 ** k * (2 ** (n + 1) - 1), 2 ** (k + 1) - 1)
       for n in range(1, 11) for k in range(1, n + 1)),
   f"n=3,k=2 で {Fraction(_a20(4, 3), _a20(3, 2))}")

# ---------------------------------------------------------------- 東大文系2019
# 第1問：正方形の辺上の3点。面積の条件から q, r を p で表す
def _pqr19(p):
    q = 2 / (3 * p)
    r = 2 * p - 1.5 * p * p
    s1 = abs(p * q) / 2                       # △OPQ
    s2 = abs((-p) * 1 - q * (r - p)) / 2      # △PQR（外積で直接）
    return q, r, s1, s2


ok("東大文19-1(1) q=2/(3p)、r=2p-3p²/2 で両方の面積が 1/3",
   all(abs(_pqr19(p)[2] - 1 / 3) < 1e-12 and abs(_pqr19(p)[3] - 1 / 3) < 1e-12
       for p in (2 / 3, 0.7, 0.75, 8 / 9, 0.95, 1.0)))
_g19 = [(3 * (2 / 3 + i / 3e6) ** 2 - 2.25 * (2 / 3 + i / 3e6) ** 3, 2 / 3 + i / 3e6)
        for i in range(0, 1000001)]
ok("東大文19-1(2) CR/OQ の最大 64/81（p=8/9）、最小 2/3（p=2/3）",
   abs(max(_g19)[0] - 64 / 81) < 1e-9 and abs(max(_g19)[1] - 8 / 9) < 1e-6
   and abs(min(_g19)[0] - 2 / 3) < 1e-9 and abs(min(_g19)[1] - 2 / 3) < 1e-6,
   f"最大 {max(_g19)[0]:.9f} at p={max(_g19)[1]:.6f}／最小 {min(_g19)[0]:.9f}")

# 第2問：D は放物線 q=(p²-4p+9)/2 と直線 q=17/2-p ではさまれた部分
_low19 = lambda p: (p * p - 4 * p + 9) / 2
_up19 = lambda p: 8.5 - p
_rnd19b = random.Random(20190225)
_hit19 = 0
_N19 = 4_000_000
for _ in range(_N19):
    _p = _rnd19b.uniform(-3.0, 5.0)
    _q = _rnd19b.uniform(0.0, 12.0)
    if _low19(_p) <= _q <= _up19(_p):
        _hit19 += 1
_area19 = _hit19 / _N19 * 8.0 * 12.0
ok("東大文19-2(1) D の面積は 18", abs(_area19 - 18) < 0.05,
   f"モンテカルロ {_N19} 点で {_area19:.4f}")
_best19 = (-9.0, None)
_worst19 = (9.0, None)
for _i in range(400_001):
    _p = -2 + 6 * _i / 400_000
    for _q in (_low19(_p), _up19(_p)):
        _c = _p / math.hypot(_p, _q)
        if _c > _best19[0]:
            _best19 = (_c, (_p, _q))
        if _c < _worst19[0]:
            _worst19 = (_c, (_p, _q))
ok("東大文19-2(2) cosθ の範囲は -4/√457 ≦ cosθ ≦ 1/√2",
   abs(_best19[0] - 1 / math.sqrt(2)) < 1e-9
   and abs(_worst19[0] + 4 / math.sqrt(457)) < 1e-9
   and abs(_best19[1][0] - 3) < 1e-4 and abs(_worst19[1][0] + 2) < 1e-4,
   f"最大 {_best19[0]:.9f} at ({_best19[1][0]:.3f}, {_best19[1][1]:.3f})／"
   f"最小 {_worst19[0]:.9f} at ({_worst19[1][0]:.3f}, {_worst19[1][1]:.3f})")

# 第3問：正八角形の上のランダムウォーク。表 +1、裏 -1 を 10 回
_s19 = _st19 = 0
for _bits in itertools.product((1, -1), repeat=10):
    _x = 0
    _f = False
    for _b in _bits:
        _x += _b
        if _x % 8 == 5:
            _f = True
    if _x % 8 == 0:
        _s19 += 1
        if _f:
            _st19 += 1
ok("東大文19-3(1) 10回後に A にある確率は 17/64",
   _s19 == 272 and Fraction(_s19, 1024) == Fraction(17, 64),
   f"全探索 {_s19} 通り（10C1+10C5+10C9 = {math.comb(10, 1) + math.comb(10, 5) + math.comb(10, 9)}）")
ok("東大文19-3(2) S かつ T の確率は 33/512",
   _st19 == 66 and Fraction(_st19, 1024) == Fraction(33, 512)
   and math.comb(10, 10) == 1 and math.comb(10, 2) == 45,
   f"全探索 {_st19} 通り（10+10+1+45 = {10 + 10 + 1 + 45}）")

# 第4問：D = {|x|+|y|≦1} に対し E = {P-Q} = {|x|+|y|≦2}
_rnd19c = random.Random(419)
_out19 = 0
for _ in range(300_000):
    _pt = []
    while len(_pt) < 2:
        _u, _v = _rnd19c.uniform(-1, 1), _rnd19c.uniform(-1, 1)
        if abs(_u) + abs(_v) <= 1:
            _pt.append((_u, _v))
    if abs(_pt[0][0] - _pt[1][0]) + abs(_pt[0][1] - _pt[1][1]) > 2 + 1e-12:
        _out19 += 1
ok("東大文19-4 P-Q はつねに |x|+|y|≦2 に入り、逆も (x/2, y/2) で作れる",
   _out19 == 0
   and all(abs(x / 2) + abs(y / 2) <= 1 + 1e-12
           for x, y in ((2, 0), (0, 2), (1, 1), (-1.5, 0.5), (-2, 0), (0.3, -1.7))),
   f"30万組で範囲外 {_out19} 件")

# ---------------------------------------------------------------- 京大文系2025
# 第1問 問1：2025^x = 3^y = 5^z から 2xy+4xz-yz = 0
_bad25k = 0
for _i in range(-3000, 3001):
    if _i == 0:
        continue
    _x = _i / 1000
    _y = _x * math.log(2025) / math.log(3)
    _z = _x * math.log(2025) / math.log(5)
    if abs(2 * _x * _y + 4 * _x * _z - _y * _z) > 1e-6 * max(1.0, abs(_y * _z)):
        _bad25k += 1
ok("京大文25-1問1 2xy+4xz-yz = 0", _bad25k == 0, f"6000点で不一致 {_bad25k} 件")

# 第1問 問2：n^4+6n^2+23 が n^2+n+3 で割り切れる n
_div25 = [n for n in range(1, 5000) if (n ** 4 + 6 * n * n + 23) % (n * n + n + 3) == 0]
ok("京大文25-1問2 割り切れるのは n = 1, 2, 11",
   _div25 == [1, 2, 11]
   and all(n ** 4 + 6 * n * n + 23 == (n * n + n + 3) * (n * n - n + 4) + (11 - n)
           for n in range(-20, 50)),
   f"n ≦ 4999 で {_div25}")

# 第2問：f(x) = x²/2 + qx + r としたときの f(f(x)) の係数
def _ff25(q, r):
    """f(f(x)) の係数 (x^4, x^3, x^2, x^1, x^0)。"""
    return (0.125, q / 2, (q * q + r) / 2 + q / 2, q * r + q * q, r * r / 2 + q * r + r)


_off25 = []
for _qi in range(-20, 21):
    for _ri in range(-20, 21):
        _c = _ff25(_qi / 4, _ri / 4)
        if abs(_c[3]) < 1e-12:  # x の係数が 0（c で消せるのは定数項だけ）
            _a, _b = _c[1], _c[2]
            if not (abs(_a) < 1e-12 or abs(_b - 2 * _a * _a) < 1e-9):
                _off25.append((_qi / 4, _ri / 4, _a, _b))
ok("京大文25-2 (a,b) の集合は「a=0」と「b=2a²」の合併",
   not _off25
   and abs(_ff25(0, 6)[1]) < 1e-12 and abs(_ff25(0, 6)[2] - 3) < 1e-12
   and abs(_ff25(2, -2)[1] - 1) < 1e-12 and abs(_ff25(2, -2)[2] - 2) < 1e-12,
   f"条件をみたす (q,r) から外れた (a,b) は {len(_off25)} 件")

# 第3問：1 と 2 を n 個並べた数が 6 で割り切れる確率
_p25 = []
for _n in range(1, 9):
    _cnt = sum(1 for _d in itertools.product((1, 2), repeat=_n)
               if int("".join(map(str, _d))) % 6 == 0)
    _p25.append(Fraction(_cnt, 2 ** _n) == Fraction(2 ** (_n - 1) + (-1) ** _n, 3 * 2 ** _n))
ok("京大文25-3 確率は (2^{n-1}+(-1)^n)/(3·2^n)", all(_p25),
   "n=1..8 を全探索で確認（0, 1/4, 1/8, 3/16, 5/32, 11/64, 21/128, 43/256）")

# 第4問：共通接線 l2: y = -x - 9/4 と、囲まれた図形の面積
_c1_25 = lambda x: x * x - 2 * abs(x)
_l2_25 = lambda x: -x - 9 / 4
ok("京大文25-4(1) l2 は C1 と x=-3/2 で、C2 と x=2 で接する",
   abs(_c1_25(-1.5) - _l2_25(-1.5)) < 1e-12 and abs(2 * (-1.5) + 2 - (-1)) < 1e-12
   and abs((5 - 1) ** 2 - 4 * (7 / 4 + 9 / 4)) < 1e-12      # C2 との判別式
   and 1 - 4 * (9 / 4) < 0,                                  # C1 の右の枝とは交わらない
   "C1 の右の枝との連立 x²-x+9/4=0 の判別式は -8")
_n25 = 2_000_000
_area25 = 0.0
for _i in range(_n25):
    _x = -1.5 + 3.0 * (_i + 0.5) / _n25
    _area25 += (_c1_25(_x) - _l2_25(_x)) * 3.0 / _n25
ok("京大文25-4(2) 面積は 9/2", abs(_area25 - 4.5) < 1e-6,
   f"数値積分 {_area25:.9f}")

# 第5問：平面 LMN が通る定点
_rnd25 = random.Random(2025)
_bad25v = 0
for _ in range(200_000):
    _s = _rnd25.uniform(0.2, 5)
    _t = _rnd25.uniform(0.2, 5)
    _den = 4 - 1 / _s - 2 / _t
    if abs(_den) < 1e-9:
        continue
    _u = 3 / _den
    if abs(1 / (4 * _s) + 1 / (2 * _t) + 3 / (4 * _u) - 1) > 1e-9:
        _bad25v += 1
ok("京大文25-5 α+β+γ=1（定点 OA/4 + OB/2 + 3OC/4 を通る）", _bad25v == 0,
   f"20万組で不一致 {_bad25v} 件")

# ---------------------------------------------------------------- 京大文系2024
# 第1問：cosθ = 1-√2/2 とした座標が条件をすべてみたし、体積が √(2√2-2)/6 になる
_ct24 = 1 - math.sqrt(2) / 2
_z24 = math.sqrt(1 - 2 * _ct24 * _ct24)
_A24, _B24, _C24, _O24 = (1, 0, 0), (0, 1, 0), (_ct24, _ct24, _z24), (0, 0, 0)


def _ang24(P, Q, R):
    a = [P[i] - Q[i] for i in range(3)]
    b = [R[i] - Q[i] for i in range(3)]
    return math.degrees(math.acos(sum(a[i] * b[i] for i in range(3))
                                  / math.dist(P, Q) / math.dist(R, Q)))


_th24 = math.degrees(math.acos(_ct24))
ok("京大文24-1 条件をみたす四面体の体積は √(2√2-2)/6",
   all(abs(math.dist(_O24, X) - 1) < 1e-12 for X in (_A24, _B24, _C24))
   and abs(_ang24(_A24, _O24, _B24) - 90) < 1e-9
   and abs(_ang24(_C24, _O24, _A24) - _th24) < 1e-9
   and abs(_ang24(_C24, _O24, _B24) - _th24) < 1e-9
   and abs(_ang24(_A24, _C24, _B24) - _th24) < 1e-9
   and abs(_z24 / 6 - math.sqrt(2 * math.sqrt(2) - 2) / 6) < 1e-15,
   f"θ = {_th24:.4f}°、体積 {_z24 / 6:.9f}")

# 第2問：立方体の塗り分け。対面でない2面は必ず辺を共有する
_adj24 = [(i, j) for i in range(6) for j in range(i + 1, 6)
          if (i, j) not in ((0, 1), (2, 3), (4, 5))]
_cnt24 = {}
for _n in (2, 3, 4, 5, 6):
    _cnt24[_n] = sum(1 for _c in itertools.product(range(_n), repeat=6)
                     if all(_c[i] != _c[j] for i, j in _adj24))
_perm24 = lambda n, k: math.perm(n, k) if k <= n else 0
ok("京大文24-2 p3 = 2/243、p4 = 3/128",
   _cnt24[3] == 6 and _cnt24[4] == 96
   and Fraction(_cnt24[3], 3 ** 6) == Fraction(2, 243)
   and Fraction(_cnt24[4], 4 ** 6) == Fraction(3, 128)
   and all(_cnt24[n] == _perm24(n, 3) + 3 * _perm24(n, 4) + 3 * _perm24(n, 5) + _perm24(n, 6)
           for n in (2, 3, 4, 5, 6)),
   f"全探索 n=2..6 で {[_cnt24[n] for n in (2, 3, 4, 5, 6)]}")

# 第3問：f(x) = |x²-g(x)| + g(x) = max(x², h(x)) の [-1,1] での最大値
def _fmax24(a, n=400_000):
    best = -9.0
    for i in range(n + 1):
        x = -1 + 2 * i / n
        g = a * x + 0.75 * a * a
        best = max(best, abs(x * x - g) + g)
    return best


_r24 = math.sqrt(0.4)


def _pred24(a):
    if a < _r24:
        return 1.0
    if a <= 1:
        return 2.5 * a * a
    return 1.5 * a * a + 2 * a - 1


ok("京大文24-3 最大値は 1 / (5/2)a² / (3/2)a²+2a-1 の3通り",
   all(abs(_fmax24(a) - _pred24(a)) < 1e-9
       for a in (0.3, 0.6, _r24 - 1e-4, _r24, 0.8, 1.0, 1.5, 2.5))
   and abs(_r24 - math.sqrt(10) / 5) < 1e-15,
   f"境目 √10/5 = {_r24:.9f}、a=1.5 で {_fmax24(1.5):.9f}")

# 第4問：八・九・十進法で桁数が同じになる最大の自然数
def _dig24(N, b):
    k = 0
    while N:
        N //= b
        k += 1
    return k


_max24 = max(N for N in range(10 ** 9, 2 ** 30)
             if _dig24(N, 8) == _dig24(N, 9) == _dig24(N, 10))
ok("京大文24-4 最大は 2³⁰-1 = 1073741823",
   _max24 == 2 ** 30 - 1 and 8 ** 11 < 10 ** 10 and 8 ** 10 > 10 ** 9,
   f"走査の最大 {_max24}（8^10 = {8 ** 10}、8^11 = {8 ** 11}）")

# 第5問：C と直線が異なる2点で交わる (a,b) の領域の面積
def _two24(a, b):
    D = (4 + a) ** 2 - 4 * (5 - b)
    return D > 0 and ((4 + a) - math.sqrt(D)) / 2 > 1


_rnd24 = random.Random(2024)
_hit24 = 0
_N24 = 4_000_000
for _ in range(_N24):
    _a = _rnd24.uniform(0, 2.2)
    _b = _rnd24.uniform(0, 2.2)
    if _a > 0 and _b > 0 and _two24(_a, _b):
        _hit24 += 1
_ar24 = _hit24 / _N24 * 2.2 * 2.2
_mis24 = 0
for _ in range(300_000):
    _a = _rnd24.uniform(0.001, 2.5)
    _b = _rnd24.uniform(0.001, 2.5)
    if ((_a + _b < 2) and ((_a + 4) ** 2 + 4 * _b > 20)) != _two24(_a, _b):
        _mis24 += 1
ok("京大文24-5 領域の面積は (50-20√5)/3",
   abs(_ar24 - (50 - 20 * math.sqrt(5)) / 3) < 0.005 and _mis24 == 0,
   f"モンテカルロ {_ar24:.5f}（厳密値 {(50 - 20 * math.sqrt(5)) / 3:.5f}）、不等式との不一致 {_mis24} 件")

# ---------------------------------------------------------------- 京大文系2023
# 第1問 問1：さいころ n 回の積が 5 の倍数
_pr23k = [Fraction(sum(1 for d in itertools.product(range(1, 7), repeat=n)
                       if math.prod(d) % 5 == 0), 6 ** n) for n in range(1, 7)]
ok("京大文23-1問1 確率は 1-(5/6)^n",
   all(p == Fraction(6 ** n - 5 ** n, 6 ** n) for p, n in zip(_pr23k, range(1, 7))),
   f"n=1..6 で {[str(p) for p in _pr23k]}")

# 第1問 問2：3乗根の有理化
_t23 = 3 ** (1 / 3)
ok("京大文23-1問2 55/(2∛9+∛3+5) = (19+7∛3-9∛9)/2",
   abs((2 * _t23 ** 2 + _t23 + 5) * (9 * _t23 ** 2 - 7 * _t23 - 19) + 110) < 1e-9
   and abs(55 / (2 * _t23 ** 2 + _t23 + 5) - (19 + 7 * _t23 - 9 * _t23 ** 2) / 2) < 1e-12,
   f"両辺とも {55 / (2 * _t23 ** 2 + _t23 + 5):.9f}")

# 第2問：OA, OB, OC を基本ベクトルにとって交点を確かめる
_D23k = (1, 2, 3)
_R23 = tuple(v / 10 for v in _D23k)      # OR = OD/10
_Q23 = (0, 0.5, 0)
_P23 = (1 / 3, 0, 0)
_C23k = (0, 0, 1)
_X1 = tuple(_Q23[i] + (5 / 3) * (_R23[i] - _Q23[i]) for i in range(3))
_X2 = tuple(_P23[i] + 0.5 * (_C23k[i] - _P23[i]) for i in range(3))
ok("京大文23-2 OR:RD = 1:9（直線 QR と PC が交わる）",
   all(abs(_X1[i] - _X2[i]) < 1e-12 for i in range(3)),
   f"交点は {tuple(round(v, 9) for v in _X1)}（OA, OB, OC 成分）")

# 第3問：正五角形の一辺
_c36 = math.cos(math.radians(36))
_side23 = 2 * math.sin(math.radians(36))
ok("京大文23-3 cos36° = (1+√5)/4、一辺 = √((5-√5)/2) > 1.15",
   abs(_c36 - (1 + math.sqrt(5)) / 4) < 1e-15
   and abs(_side23 - math.sqrt((5 - math.sqrt(5)) / 2)) < 1e-15
   and _side23 > 1.15 and 2.355 ** 2 > 5,
   f"一辺 {_side23:.9f}（1.15 より大きい）")

# 第4問：a_n = S_n/n + (n-1)2^n
_a23 = {1: 3.0}
_S23 = {1: 3.0}
for _n in range(2, 15):
    _a23[_n] = _S23[_n - 1] / (_n - 1) + _n * 2 ** _n   # 漸化式を S_{n-1} で書き直した形
    _S23[_n] = _S23[_n - 1] + _a23[_n]
ok("京大文23-4 一般項は (n+1)2ⁿ-1",
   all(abs(_a23[n] - ((n + 1) * 2 ** n - 1)) < 1e-6 for n in range(1, 15))
   and all(abs(_S23[n] - n * (2 ** (n + 1) - 1)) < 1e-6 for n in range(1, 15)),
   f"a_1..a_9 = {[round(_a23[n]) for n in range(1, 10)]}")

# 第5問：f(x) + ∫(x-y)²f(y)dy = 2x²+x+5/3
_f23 = lambda y: 1 - 3 * y


def _int23(g, n=2_000_000):
    s = 0.0
    for i in range(n):
        y = -1 + 2 * (i + 0.5) / n
        s += g(y) * 2 / n
    return s


_A23k = _int23(_f23)
_B23k = _int23(lambda y: y * _f23(y))
_C23k2 = _int23(lambda y: y * y * _f23(y))
ok("京大文23-5 f(x) = -3x+1",
   abs(_A23k - 2) < 1e-9 and abs(_B23k + 2) < 1e-9 and abs(_C23k2 - 2 / 3) < 1e-9
   and all(abs(_f23(x) + _A23k * x * x - 2 * _B23k * x + _C23k2
                - (2 * x * x + x + 5 / 3)) < 1e-9
           for x in (-1.0, -0.3, 0.0, 0.7, 2.0)),
   f"A={_A23k:.9f}, B={_B23k:.9f}, C={_C23k2:.9f}")

# ---------------------------------------------------------------- 京大文系2022
ok("京大文22-1 5.4 < log_4 2022 < 5.5",
   5.4 < math.log(2022, 4) < 5.5
   and 5.4 * (2 * 0.3011) < 3.301          # 下からの評価
   and 2022 < 2 ** 11,                      # 上からの評価
   f"log_4 2022 = {math.log(2022, 4):.9f}")

# 第2問：三角柱の辺に沿った経路。A から n 回で上の面に戻る数
_E22 = {"A": "BCD", "B": "ACE", "C": "ABF", "D": "EFA", "E": "DFB", "F": "DEC"}


def _walk22b(n):
    cur = {"A": 1}
    for _ in range(n):
        nxt = {}
        for v, c in cur.items():
            for w in _E22[v]:
                nxt[w] = nxt.get(w, 0) + c
        cur = nxt
    return sum(c for v, c in cur.items() if v in "ABC")


_cnt22 = [_walk22b(n) for n in range(1, 10)]
ok("京大文22-2 a_n = (3ⁿ+1)/2",
   all(c == (3 ** n + 1) // 2 for c, n in zip(_cnt22, range(1, 10))),
   f"n=1..9 で {_cnt22}")

# 第3問：直交する2接線と放物線で囲まれた面積
_p22 = lambda x: x * x / 4
_l1_22 = lambda x: -x / 2 - 0.25
_l2_22 = lambda x: 2 * x - 4
_ar22 = 0.0
_n22 = 2_000_000
for _i in range(_n22):
    _x = -1 + 5 * (_i + 0.5) / _n22
    _ar22 += (_p22(_x) - (_l1_22(_x) if _x < 1.5 else _l2_22(_x))) * 5 / _n22
ok("京大文22-3 面積は 125/48",
   abs(-0.5 * 2 + 1) < 1e-15                        # 傾きの積が -1
   and abs(_l1_22(1.5) + 1) < 1e-15 and abs(_l2_22(1.5) + 1) < 1e-15
   and abs(_ar22 - 125 / 48) < 1e-6,
   f"数値積分 {_ar22:.9f}（125/48 = {125 / 48:.9f}）")

# 第4問：PQ/RS = √2 のときの PQ の中点の軌跡
_rnd22 = random.Random(2022)
_bad22b = 0
for _ in range(200_000):
    _a = _rnd22.uniform(0.05, 8)
    _b = 1 / (4 * _a)                      # ab = 1/4
    _D = 1 + 4 * _a * _b
    _al = (1 - math.sqrt(_D)) / (2 * _a)   # 負の解（P 側）
    _be = (1 + math.sqrt(_D)) / (2 * _a)   # 正の解（Q 側）
    _P = (_al, -1 / _al)
    _Q = (_be, -1 / _be)
    _R = (1 / _a, 0.0)
    _S = (0.0, 1 / _b)
    _M = ((_P[0] + _Q[0]) / 2, (_P[1] + _Q[1]) / 2)
    if (abs(math.dist(_P, _Q) / math.dist(_R, _S) - math.sqrt(2)) > 1e-9
            or abs(_M[0] * _M[1] - 1) > 1e-9
            or abs(_M[0] - 1 / (2 * _a)) > 1e-9 or abs(_M[1] - 1 / (2 * _b)) > 1e-9):
        _bad22b += 1
ok("京大文22-4 軌跡は xy = 1 の x>0 の部分", _bad22b == 0,
   f"ab=1/4 の20万組で不一致 {_bad22b} 件")

# 第5問：内積の表から座標を作って PG を調べる
_G22 = [[16.0, 8.0, 8.0], [8.0, 9.0, 6.0], [8.0, 6.0, 12.0]]


def _chol22(M):
    """3×3 のコレスキー分解。行ベクトルがそのまま a, b, c の座標になる。"""
    L = [[0.0] * 3 for _ in range(3)]
    for i in range(3):
        for j in range(i + 1):
            t = M[i][j] - sum(L[i][k] * L[j][k] for k in range(j))
            L[i][j] = math.sqrt(t) if i == j else t / L[j][j]
    return L


_L22 = _chol22(_G22)
_a22, _b22, _c22 = _L22[0], _L22[1], _L22[2]
_sub = lambda u, v: [u[i] - v[i] for i in range(3)]
_nrm = lambda u: math.sqrt(sum(x * x for x in u))
_det22 = (_a22[0] * (_b22[1] * _c22[2] - _b22[2] * _c22[1])
          - _a22[1] * (_b22[0] * _c22[2] - _b22[2] * _c22[0])
          + _a22[2] * (_b22[0] * _c22[1] - _b22[1] * _c22[0]))
_best22 = (9.0, None)
_perp22b = 0.0
for _i in range(400_001):
    _s = _i / 400_000
    _OP = [(1 - _s) * _b22[k] + _s * _c22[k] for k in range(3)]
    _Gp = [(_a22[k] + _OP[k]) / 3 for k in range(3)]
    _PG = _sub(_Gp, _OP)
    _perp22b = max(_perp22b, abs(sum(_PG[k] * _a22[k] for k in range(3))))
    _d = _nrm(_PG)
    if _d < _best22[0]:
        _best22 = (_d, _s)
ok("京大文22-5 PG⊥OA、PG の最小は 4/3",
   abs(_nrm(_a22) - 4) < 1e-9 and abs(_nrm(_b22) - 3) < 1e-9
   and abs(_nrm(_c22) - 2 * math.sqrt(3)) < 1e-9
   and abs(_nrm(_sub(_b22, _a22)) - 3) < 1e-9
   and abs(_nrm(_sub(_c22, _b22)) - 3) < 1e-9
   and abs(_nrm(_sub(_c22, _a22)) - 2 * math.sqrt(3)) < 1e-9
   and abs(_det22) / 6 > 1e-6                       # つぶれていない
   and _perp22b < 1e-9 and abs(_best22[0] - 4 / 3) < 1e-6,
   f"体積 {abs(_det22) / 6:.6f}、PG 最小 {_best22[0]:.9f}（s={_best22[1]:.6f}）")

# ---------------------------------------------------------------- 京大文系2021
# 第1問 問1：6.75 と 101.0101(2) の積を2進法・4進法で
_pr21 = Fraction(27, 4) * (Fraction(85, 16))     # 6.75 × 101.0101(2)
_bin21 = 0b100011 + Fraction(55, 64)
_quad21 = 2 * 16 + 0 * 4 + 3 + Fraction(3, 4) + Fraction(1, 16) + Fraction(3, 64)
ok("京大文21-1問1 積は 100011.110111(2) = 203.313(4)",
   _pr21 == Fraction(2295, 64) and _bin21 == _pr21 and _quad21 == _pr21
   and Fraction(6) + Fraction(3, 4) == Fraction(4 + 2) + Fraction(1, 2) + Fraction(1, 4),
   f"積 = {_pr21} = {float(_pr21)}")

# 第1問 問2：垂心
_A21 = (3.0, 0.0)
_B21 = (2 * math.cos(math.radians(60)), 2 * math.sin(math.radians(60)))
_H21 = (_A21[0] / 9 + 2 * _B21[0] / 3, _A21[1] / 9 + 2 * _B21[1] / 3)
_dot = lambda u, v: u[0] * v[0] + u[1] * v[1]
ok("京大文21-1問2 OH = OA/9 + 2OB/3",
   abs(math.hypot(*_A21) - 3) < 1e-12 and abs(math.hypot(*_B21) - 2) < 1e-12
   and abs(_dot(_A21, _B21) - 3) < 1e-12
   and abs(_dot((_H21[0] - _A21[0], _H21[1] - _A21[1]), _B21)) < 1e-12
   and abs(_dot((_H21[0] - _B21[0], _H21[1] - _B21[1]), _A21)) < 1e-12,
   f"H = ({_H21[0]:.9f}, {_H21[1]:.9f})")

# 第2問：絶対値つきの定積分
_n21 = 4_000_000
_s21 = 0.0
for _i in range(_n21):
    _x = -1 + 2 * (_i + 0.5) / _n21
    _s21 += abs(_x * _x - _x / 2 - 0.5) * 2 / _n21
ok("京大文21-2 定積分は 19/24", abs(_s21 - 19 / 24) < 1e-7,
   f"数値積分 {_s21:.9f}（19/24 = {19 / 24:.9f}）")

# 第3問：箱の玉の受け渡し
def _balls21(n, trials, seed):
    rnd = random.Random(seed)
    hit = 0
    for _ in range(trials):
        boxes = [["R", "W"] for _ in range(n)]
        for k in range(n - 1):
            b = rnd.choice(boxes[k])
            boxes[k].remove(b)
            boxes[k + 1].append(b)
        b = rnd.choice(boxes[n - 1])
        boxes[n - 1].remove(b)
        boxes[0].append(b)
        if sorted(boxes[0]) == ["R", "W"]:
            hit += 1
    return hit / trials


_sim21 = [(n, _balls21(n, 400_000, 21), 0.5 + 0.5 / 3 ** (n - 1)) for n in (2, 3, 4, 5)]
ok("京大文21-3 確率は 1/2 + 1/(2·3^{n-1})",
   all(abs(got - pred) < 0.004 for _, got, pred in _sim21),
   "、".join(f"n={n}: {got:.5f}/{pred:.5f}" for n, got, pred in _sim21))

# 第4問：四角形 OPFQ の面積
_cross21 = lambda u, v: (u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2],
                         u[0] * v[1] - u[1] * v[0])
_best21b = (9.0, None)
_coplanar21 = 0.0
for _i in range(300_001):
    _p = 3 * _i / 300_000
    _q = 3 - _p
    _OP = (1.0, 0.0, _p)
    _OQ = (0.0, 2.0, _q)
    _coplanar21 = max(_coplanar21, abs(sum(a * b for a, b in zip(_cross21(_OP, _OQ), (1, 2, 3)))))
    _S = math.sqrt(sum(x * x for x in _cross21(_OP, _OQ)))
    if _S < _best21b[0]:
        _best21b = (_S, _p)
ok("京大文21-4 P(1,0,3/5)、Q(0,2,12/5)、S = 2√70/5",
   _coplanar21 < 1e-9                                   # O,P,F,Q が同一平面
   and abs(_best21b[0] - 2 * math.sqrt(70) / 5) < 1e-6
   and abs(_best21b[1] - 0.6) < 1e-4,
   f"S 最小 {_best21b[0]:.9f}（p={_best21b[1]:.6f}）")

# 第5問：p 素数なら p^4+14 は素数でない
def _isprime21(m):
    if m < 2:
        return False
    for d in range(2, int(m ** 0.5) + 1):
        if m % d == 0:
            return False
    return True


_ps21 = [p for p in range(2, 200) if _isprime21(p)]
ok("京大文21-5 p 素数なら p⁴+14 は素数でない",
   not any(_isprime21(p ** 4 + 14) for p in _ps21)
   and all((p ** 4 + 14) % 3 == 0 for p in _ps21 if p != 3)
   and 3 ** 4 + 14 == 95 == 5 * 19,
   f"200未満の素数 {len(_ps21)} 個すべてで合成数")

# ---------------------------------------------------------------- 京大文系2020
# 第1問：C: y=|x|x-3x+1 と l: y=x-3
_cv20 = lambda x: abs(x) * x - 3 * x + 1
_ln20 = lambda x: x - 3
_xb20 = -2 - 2 * math.sqrt(2)
_n20k = 4_000_000
_ar20 = 0.0
for _i in range(_n20k):
    _x = _xb20 + (2 - _xb20) * (_i + 0.5) / _n20k
    _ar20 += (_cv20(_x) - _ln20(_x)) * (2 - _xb20) / _n20k
ok("京大文20-1 a=-3、面積は (48+32√2)/3",
   abs(_cv20(2) - _ln20(2)) < 1e-12 and abs(_cv20(_xb20) - _ln20(_xb20)) < 1e-12
   and abs(_ar20 - (48 + 32 * math.sqrt(2)) / 3) < 1e-6,
   f"数値積分 {_ar20:.9f}（厳密値 {(48 + 32 * math.sqrt(2)) / 3:.9f}）")

# 第2問：y=x² と2点で直交する2次関数
def _ortho20(p, q, r):
    """共有点が2個あり、そのどちらでも接線が直交するか。"""
    A, B, C = 1 - p, -q, -r
    if abs(A) < 1e-12:
        return False
    D = B * B - 4 * A * C
    if D <= 1e-9:
        return False
    ts = ((-B - math.sqrt(D)) / (2 * A), (-B + math.sqrt(D)) / (2 * A))
    return all(abs(2 * t * (2 * p * t + q) + 1) < 1e-7 for t in ts)


ok("京大文20-2 2つの族（q=0,p<0,r=(p-1)/(4p)）と（p=-1,r=1/2,q 任意）",
   all(_ortho20(p, 0, (p - 1) / (4 * p)) for p in (-0.25, -0.5, -1, -2, -5))
   and all(_ortho20(-1, q, 0.5) for q in (0, 0.5, 2, -3))
   and not any(_ortho20(p, q, r) for p, q, r in
               ((-1, 2, 0.4), (0.5, 0, -0.25), (-2, 1, 0.375), (2, 0, 0.125))),
   "条件を外した4例ではいずれも成り立たない")

# 第3問：f(m,n) = mn²+am²+n²+8 が 16 で割り切れる (m,n) の存在条件
_exist20 = {}
for _a in range(1, 32, 2):
    _exist20[_a] = any((m * n * n + _a * m * m + n * n + 8) % 16 == 0
                       for m in range(32) for n in range(32))
ok("京大文20-3 条件は a ≡ 3 (mod 4)",
   all(_exist20[a] == (a % 4 == 3) for a in _exist20)
   and all((2 * 4 + a * 4 + 4 + 8) % 16 == 0 for a in _exist20 if a % 4 == 3),
   f"解をもつ a は {[a for a in sorted(_exist20) if _exist20[a]]}")

# 第4問：単位球面上の4点
_k20 = (3 * math.sqrt(2) - math.sqrt(6)) / 8
_a20v = (0.5, math.sqrt(3) / 2, 0.0)
_b20v = (-0.5, math.sqrt(3) / 2, 0.0)
_c20v = (0.0, -1 / math.sqrt(2), 1 / math.sqrt(2))
_d20v = (0.0, 2 * _k20 / math.sqrt(3), 1 / math.sqrt(2) + 2 * _k20 / math.sqrt(3))
_dt = lambda u, v: sum(u[i] * v[i] for i in range(3))
ok("京大文20-4 k = (3√2-√6)/8",
   all(abs(_dt(v, v) - 1) < 1e-12 for v in (_a20v, _b20v, _c20v, _d20v))
   and abs(_dt(_a20v, _b20v) - 0.5) < 1e-12 and abs(_dt(_c20v, _d20v) - 0.5) < 1e-12
   and abs(_dt(_a20v, _c20v) + math.sqrt(6) / 4) < 1e-12
   and abs(_dt(_b20v, _c20v) + math.sqrt(6) / 4) < 1e-12
   and abs(_dt(_a20v, _d20v) - _k20) < 1e-12 and abs(_dt(_b20v, _d20v) - _k20) < 1e-12
   and abs(16 * _k20 ** 2 + 4 * math.sqrt(6) * _k20 - 3) < 1e-12,
   f"k = {_k20:.9f}")

# 第5問：4×4 のラテン方陣
_rows20 = list(itertools.permutations(range(4)))
_lat20 = 0
for _r1 in _rows20:
    for _r2 in _rows20:
        if any(_r1[j] == _r2[j] for j in range(4)):
            continue
        for _r3 in _rows20:
            if any(_r3[j] in (_r1[j], _r2[j]) for j in range(4)):
                continue
            for _r4 in _rows20:
                if any(_r4[j] in (_r1[j], _r2[j], _r3[j]) for j in range(4)):
                    continue
                _lat20 += 1
ok("京大文20-5 入れ方は 576 通り", _lat20 == 576 and 24 * 24 == 576,
   f"全探索 {_lat20} 通り（1行目固定で 24 通り × 4! = 576）")

# ---------------------------------------------------------------- 京大文系2019
# 第1問 問1：多項式の割り算
def _pmul19(A, B):
    C = [0] * (len(A) + len(B) - 1)
    for i, x in enumerate(A):
        for j, y in enumerate(B):
            C[i + j] += x * y
    return C


_got19 = _pmul19([1, 1, 1, 1], [1, 1, 1])        # (x³+x²+x+1)(x²+x+1)、x^0 から
_got19 = [_got19[i] + ([1, 1][i] if i < 2 else 0) for i in range(len(_got19))]
ok("京大文19-1問1 a=3、Q=x²+x+1、R=x+1",
   _got19 == [2, 3, 3, 3, 2, 1],
   f"展開した係数（x⁰から） {_got19}")

# 第1問 問2：8.94^18 の桁数と上2桁
_v19 = Fraction(894, 100) ** 18
_i19 = _v19.numerator // _v19.denominator
ok("京大文19-1問2 18桁で上2桁は 13",
   len(str(_i19)) == 18 and str(_i19)[:2] == "13"
   and 80 ** 9 == 134217728 * 10 ** 9
   and 0.98875 * 1.34217728e17 > 1.3e17,
   f"8.94^18 の整数部分 = {_i19}")

# 第2問：f(x)=x²+2(ax+b|x|) の最小値
def _m19(a, b, N=400_000):
    best = float("inf")
    for i in range(N + 1):
        x = -20 + 40 * i / N
        best = min(best, x * x + 2 * (a * x + b * abs(x)))
    return best


def _mpred19(a, b):
    if a <= -b:
        return -((a + b) ** 2)
    if a >= b:
        return -((a - b) ** 2)
    return 0.0


ok("京大文19-2 m は -(a+b)² / 0 / -(a-b)² の3通り",
   all(abs(_m19(a, b) - _mpred19(a, b)) < 1e-5
       for b in (1.0, 2.5)
       for a in (-5.0, -b - 0.3, -b, -0.5, 0.0, 0.5, b, b + 0.3, 5.0)),
   "b=1, 2.5 について a を9通りで確認")

# 第3問：「すべての b に対し、ある x で ax²+bx+c<0」
def _exists19(a, b, c):
    xs = [0.0] + ([-b / (2 * a)] if a != 0 else [])
    xs += [10.0 ** e for e in range(13)] + [-(10.0 ** e) for e in range(13)]
    return any(a * x * x + b * x + c < 0 for x in xs)


def _prop19(a, c):
    return all(_exists19(a, b, c) for b in (i / 20 for i in range(-400, 401)))


_cases19 = ((1, 1), (1, -1), (-1, 1), (-1, -1), (0, 1), (0, -1), (0, 0), (2, 0),
            (0.5, 0.0001), (-0.0001, 5), (-5, 1e-9), (1e-9, -1e-9), (3, 2),
            (0, -0.001), (0.001, 0))
ok("京大文19-3 条件は「a<0 または c<0」",
   all(_prop19(a, c) == (a < 0 or c < 0) for a, c in _cases19),
   f"{len(_cases19)} 通りの (a,c) で一致")

# 第4問：低→高の切り替わりがちょうど1回
def _cross19(n):
    tot = Fraction(0)
    for bits in itertools.product((0, 1), repeat=n):   # 1 が「5以上」
        seq = (0,) + bits
        if sum(1 for k in range(1, n + 1) if seq[k - 1] == 0 and seq[k] == 1) == 1:
            tot += Fraction(1, 3) ** sum(bits) * Fraction(2, 3) ** (n - sum(bits))
    return tot


ok("京大文19-4 確率は ((n-1)2ⁿ+1)/3ⁿ",
   all(_cross19(n) == Fraction((n - 1) * 2 ** n + 1, 3 ** n) for n in range(1, 13)),
   "n=1..12 を全探索で確認（1/3, 5/9, 17/27, 49/81, 43/81, …）")

# 第5問：球に内接する四角錐の体積
_best19 = (0.0, None)
for _i in range(1_000_000):
    _d = _i / 1_000_000
    _V = (2 / 3) * (1 - _d * _d) * (1 + _d)
    if _V > _best19[0]:
        _best19 = (_V, _d)
ok("京大文19-5 体積の最大は 64/81",
   abs(_best19[0] - 64 / 81) < 1e-9 and abs(_best19[1] - 1 / 3) < 1e-5,
   f"最大 {_best19[0]:.9f}（d={_best19[1]:.6f}）")

# ---------------------------------------------------------------- 京大理系2024
# 第1問：立方体の塗り分け（文系2024第2問と同じ設定）。p4 と n→∞ の極限
_adjR = [(i, j) for i in range(6) for j in range(i + 1, 6)
         if (i, j) not in ((0, 1), (2, 3), (4, 5))]
_cntR = {}
for _n in (4, 5, 6, 7):
    _cntR[_n] = sum(1 for _c in itertools.product(range(_n), repeat=6)
                    if all(_c[i] != _c[j] for i, j in _adjR))
_permR = lambda n, k: math.perm(n, k) if k <= n else 0
_pR = lambda n: (_permR(n, 3) + 3 * _permR(n, 4) + 3 * _permR(n, 5) + _permR(n, 6)) / n ** 6
ok("京大理24-1 p4 = 3/128、lim p_n = 1",
   Fraction(_cntR[4], 4 ** 6) == Fraction(3, 128)
   and all(_cntR[n] == _permR(n, 3) + 3 * _permR(n, 4) + 3 * _permR(n, 5) + _permR(n, 6)
           for n in _cntR)
   and _pR(10) < _pR(100) < _pR(1000) < _pR(10 ** 5) < 1 and _pR(10 ** 5) > 0.9998,
   f"全探索 n=4..7 で {[_cntR[n] for n in (4, 5, 6, 7)]}、p_(10^5) = {_pR(10 ** 5):.6f}")

# 第2問：z = (x+y)/2 の動く範囲は中心 4+3i、半径 1/2〜5/2 の円環
_rnd24k = random.Random(2024)
_out24 = 0
for _ in range(300_000):
    while True:
        _ux, _uy = _rnd24k.uniform(-2, 2), _rnd24k.uniform(-2, 2)
        if _ux * _ux + _uy * _uy <= 4:
            break
    _th = _rnd24k.uniform(0, 2 * math.pi)
    _zx = (_ux + 8 + 3 * math.cos(_th)) / 2
    _zy = (_uy + 6 + 3 * math.sin(_th)) / 2
    _r = math.hypot(_zx - 4, _zy - 3)
    if not (0.5 - 1e-9 <= _r <= 2.5 + 1e-9):
        _out24 += 1
ok("京大理24-2 円環 1/2 ≦ |z-(4+3i)| ≦ 5/2、面積 6π",
   _out24 == 0 and abs(math.pi * 2.5 ** 2 - math.pi * 0.5 ** 2 - 6 * math.pi) < 1e-12,
   f"30万組で範囲外 {_out24} 件、面積 {6 * math.pi:.6f}")

# 第3問：直線 QY と PX がねじれの位置
def _det3(u, v, w):
    return (u[0] * (v[1] * w[2] - v[2] * w[1])
            - u[1] * (v[0] * w[2] - v[2] * w[0])
            + u[2] * (v[0] * w[1] - v[1] * w[0]))


_bad24s = 0
for _i in range(-20, 21):
    for _j in range(-20, 21):
        _x, _y = _i / 4, _j / 4
        _PX = (-0.5, 0.0, _x)
        _QY = (-0.5, 0.5 - _y, _y)
        _PQ = (0.0, 0.5, 0.0)
        if (abs(_det3(_PX, _QY, _PQ)) > 1e-12) != (_x != _y):
            _bad24s += 1
ok("京大理24-3 ねじれの位置 ⟺ x ≠ y", _bad24s == 0,
   f"1681 組で不一致 {_bad24s} 件")

# 第4問：a_{n+1} = a_n/2（偶）/ (3a_n+1)/2（奇）
def _step24(x):
    return x // 2 if x % 2 == 0 else (3 * x + 1) // 2


def _oddrun24(a0):
    k = 0
    x = a0
    while x % 2 == 1:
        k += 1
        x = _step24(x)
    return k


ok("京大理24-4 最小は 15 と 2047（= 2⁴-1, 2¹¹-1）",
   min(a for a in range(1, 100_000) if _oddrun24(a) >= 4) == 15
   and min(a for a in range(1, 100_000) if _oddrun24(a) >= 11) == 2047
   and 2 ** 4 - 1 == 15 and 2 ** 11 - 1 == 2047,
   "a_0 を 1..99999 で走査して確認")

# 第5問：D_a の面積
_sh24 = lambda x: (math.exp(x) - math.exp(-x)) / 2
_ch24 = lambda x: (math.exp(x) + math.exp(-x)) / 2


def _Snum24(a, N=1_000_000):
    b = math.log(a + math.sqrt(a * a + 1))
    s = 0.0
    for i in range(N):
        x = b * (i + 0.5) / N
        top = min(_ch24(x), a)
        bot = _sh24(x)
        if top > bot:
            s += (top - bot) * b / N
    return s


def _Spred24(a):
    return (1 + math.sqrt(a * a - 1) - math.sqrt(a * a + 1)
            + a * math.log((a + math.sqrt(a * a + 1)) / (a + math.sqrt(a * a - 1))))


ok("京大理24-5 S_a の式と lim S_a = 1",
   all(abs(_Snum24(a) - _Spred24(a)) < 1e-6 for a in (1.0, 1.5, 2.0, 5.0, 20.0))
   and abs(_Spred24(10 ** 8) - 1) < 1e-8 and _Spred24(100) < 1,
   f"a=2 で {_Spred24(2.0):.9f}、a=10⁸ で {_Spred24(10 ** 8):.9f}")

# 第6問：2^√k の桁数と最高位
_c24 = math.log(10) / math.log(2)


def _NL24(n):
    lo = ((n - 1) * _c24) ** 2
    hi = (n * _c24) ** 2
    hi1 = ((n - 1) * _c24 + 1) ** 2
    rng = range(max(1, math.floor(lo) - 2), math.ceil(hi) + 3)
    return (sum(1 for k in rng if lo <= k < hi), sum(1 for k in rng if lo <= k < hi1))


_rat24 = [(_NL24(n)[1] / _NL24(n)[0]) for n in (10, 50, 200, 1000, 5000)]
ok("京大理24-6 極限は log10(2)",
   all(abs(r - math.log10(2)) < 0.012 for r in _rat24)
   and abs(_rat24[-1] - math.log10(2)) < 2e-5
   and all(_rat24[i] < _rat24[i + 1] for i in range(len(_rat24) - 1)),
   f"n=10,50,200,1000,5000 で {[round(r, 5) for r in _rat24]}（log10 2 = {math.log10(2):.5f}）")

# ---------------------------------------------------------------- 京大理系2023
# 第1問 問1：∫₁⁴ √x log(x²) dx
_n23r = 4_000_000
_i23 = 0.0
for _i in range(_n23r):
    _x = 1 + 3 * (_i + 0.5) / _n23r
    _i23 += math.sqrt(_x) * math.log(_x * _x) * 3 / _n23r
ok("京大理23-1問1 (64/3)log2 - 56/9",
   abs(_i23 - ((64 / 3) * math.log(2) - 56 / 9)) < 1e-7,
   f"数値積分 {_i23:.9f}（厳密値 {(64 / 3) * math.log(2) - 56 / 9:.9f}）")

# 第1問 問2：x^2023-1 を x⁴+x³+x²+x+1 で割った余り
def _pdivmod23(A, B):
    A = A[:]
    while len(A) >= len(B):
        if A[-1] == 0:
            A.pop()
            continue
        c = A[-1] // B[-1]
        sh = len(A) - len(B)
        for i, b in enumerate(B):
            A[sh + i] -= c * b
        while A and A[-1] == 0:
            A.pop()
    return A


_A23r = [0] * 2024
_A23r[2023] = 1
_A23r[0] = -1
ok("京大理23-1問2 余りは x³-1", _pdivmod23(_A23r, [1, 1, 1, 1, 1]) == [-1, 0, 0, 1],
   "整数係数のまま多項式除算して確認")

# 第3問：さいころ n 回の積が 5 / 15 で割り切れる確率
_ok23p = True
for _n in range(1, 8):
    _c5 = _c15 = 0
    for _d in itertools.product(range(1, 7), repeat=_n):
        _Y = math.prod(_d)
        if _Y % 5 == 0:
            _c5 += 1
        if _Y % 15 == 0:
            _c15 += 1
    if (Fraction(_c5, 6 ** _n) != 1 - Fraction(5, 6) ** _n
            or Fraction(_c15, 6 ** _n) != 1 - Fraction(5, 6) ** _n
            - Fraction(2, 3) ** _n + Fraction(1, 2) ** _n):
        _ok23p = False
ok("京大理23-3 1-(5/6)ⁿ と 1-(5/6)ⁿ-(2/3)ⁿ+(1/2)ⁿ", _ok23p,
   "n=1..7 を全探索で確認")

# 第4問：f = g + 1/g の最大最小
_g23 = lambda x: math.exp(-x * x) + x * x / 4 + 1
_f23r = lambda x: _g23(x) + 1 / _g23(x)
_best23 = (-9.0, None)
_worst23 = (9.0, None)
for _i in range(2_000_001):
    _x = -1 + 2 * _i / 2_000_000
    _v = _f23r(_x)
    if _v > _best23[0]:
        _best23 = (_v, _x)
    if _v < _worst23[0]:
        _worst23 = (_v, _x)
_m23 = 1.25 + 1 / math.e
ok("京大理23-4 最大 5/2（x=0）、最小 m+1/m（m=5/4+1/e、x=±1）",
   abs(_best23[0] - 2.5) < 1e-12 and abs(_best23[1]) < 1e-6
   and abs(_worst23[0] - (_m23 + 1 / _m23)) < 1e-9 and abs(abs(_worst23[1]) - 1) < 1e-6,
   f"最大 {_best23[0]:.9f}、最小 {_worst23[0]:.9f}（m={_m23:.9f}）")

# 第5問：線分 PQ の通過範囲と体積
_rnd23r = random.Random(2023)
_out23 = 0
for _ in range(200_000):
    _a = _rnd23r.random()
    _t = _rnd23r.random()
    _sg = _rnd23r.choice((1, -1))
    _th = _rnd23r.uniform(0, 2 * math.pi)
    _b = 1 - _a
    _px = (1 - _t) * _sg * _a
    _py = _t * _b * math.cos(_th)
    _pz = _t * _b * math.sin(_th)
    if math.sqrt(abs(_px)) + math.sqrt(math.hypot(_py, _pz)) > 1 + 1e-9:
        _out23 += 1
_vol23 = 0.0
_n23v = 2_000_000
for _i in range(_n23v):
    _x = (_i + 0.5) / _n23v
    _vol23 += 2 * math.pi * (1 - math.sqrt(_x)) ** 4 / _n23v
ok("京大理23-5 通過範囲は √|x|+√r ≦ 1、体積 2π/15",
   _out23 == 0 and abs(_vol23 - 2 * math.pi / 15) < 1e-6,
   f"線分上の20万点で範囲外 {_out23} 件、体積 {_vol23:.9f}（2π/15 = {2 * math.pi / 15:.9f}）")

# 第6問：c_k = p^k cos(kθ) が整数で p で割り切れない
_ok23c = True
for _p in (3, 5, 7, 11, 13):
    _th23 = math.acos(1 / _p)
    _ck = [1, 1]
    for _k in range(2, 20):
        _ck.append(2 * _ck[-1] - _p * _p * _ck[-2])
    for _k in range(1, 9):
        if (abs(_p ** _k * math.cos(_k * _th23) - _ck[_k]) > 1e-4
                or _ck[_k] % _p != pow(2, _k - 1, _p) or _ck[_k] % _p == 0):
            _ok23c = False
ok("京大理23-6 c_k ≡ 2^{k-1} (mod p) で p では割り切れない（m,n は存在しない）", _ok23c,
   "p=3,5,7,11,13 について k≦8 で確認")

# ---------------------------------------------------------------- 京大理系2022
# 第2問：3枚の札の間隔がともに2以上
_ok22r = True
for _n in range(5, 13):
    _c = sum(1 for t in itertools.combinations(range(1, _n + 1), 3)
             if t[1] - t[0] >= 2 and t[2] - t[1] >= 2)
    if Fraction(_c, math.comb(_n, 3)) != Fraction((_n - 3) * (_n - 4), _n * (_n - 1)):
        _ok22r = False
ok("京大理22-2 確率は (n-3)(n-4)/(n(n-1))", _ok22r, "n=5..12 を全探索で確認")

# 第3問：A_n = gcd(n²+2, n⁴+2, n⁶+2)
_pred22 = {0: 2, 1: 3, 2: 6, 3: 1, 4: 6, 5: 3}
ok("京大理22-3 A_n = gcd(n²+2, 6)（n mod 6 で 2,3,6,1,6,3）",
   all(math.gcd(math.gcd(n * n + 2, n ** 4 + 2), n ** 6 + 2) == _pred22[n % 6]
       == math.gcd(n * n + 2, 6) for n in range(1, 2000)),
   "n=1..1999 で確認")

# 第5問：S = 2/3、f(t)=t cos³t の最大と不等式
_S22 = 0.0
_N22 = 2_000_000
for _i in range(_N22):
    _x = (math.pi / 2) * (_i + 0.5) / _N22
    _S22 += math.cos(_x) ** 3 * (math.pi / 2) / _N22
_f22 = lambda t: t * math.cos(t) ** 3
_best22b = (-9.0, None)
for _i in range(1, 2_000_000):
    _t = (math.pi / 2) * _i / 2_000_000
    _v = _f22(_t)
    if _v > _best22b[0]:
        _best22b = (_v, _t)
_al22 = _best22b[1]
_h22 = lambda u: 8 * u ** 4 - 16 * u * u - 9 * u + 8
ok("京大理22-5 S=2/3、f(α)=cos⁴α/(3sinα)、f(α)/S < 9/16",
   abs(_S22 - 2 / 3) < 1e-7
   and abs(math.cos(_al22) - 3 * _al22 * math.sin(_al22)) < 1e-5
   and abs(_best22b[0] - math.cos(_al22) ** 4 / (3 * math.sin(_al22))) < 1e-6
   and _best22b[0] / (2 / 3) < 9 / 16
   and math.sin(_al22) > 0.5 and _al22 > math.pi / 6
   and math.sqrt(3) / 2 - math.pi / 4 > 0
   and abs(_h22(0.5)) < 1e-12
   and all(abs(_h22(u / 100) - (2 * u / 100 - 1)
                * (4 * (u / 100) ** 3 + 2 * (u / 100) ** 2 - 7 * (u / 100) - 8)) < 1e-12
           for u in range(101)),
   f"α={_al22:.6f}、f(α)/S={_best22b[0] / (2 / 3):.6f}（9/16 = {9 / 16}）")

# 第6問：x_n - y_n = n(n-1)/2
_x22 = [None, 0.0]
for _n in range(1, 16):
    _x22.append(_x22[_n] + _n + 2 * math.cos(2 * math.pi * _x22[_n] / 3))


def _y22(n):
    m, r = (n - 1) // 3, (n - 1) % 3
    return (3 * m, 3 * m + 2, 3 * m + 4)[r]


ok("京大理22-6 x_n - y_n = n(n-1)/2",
   all(abs(_x22[n] - _y22(n) - n * (n - 1) / 2) < 1e-9 for n in range(1, 16))
   and all(round(_x22[n]) % 3 == (1 if n % 3 == 0 else 0) for n in range(1, 16)),
   f"x_n-y_n（n=1..12）= {[round(_x22[n] - _y22(n)) for n in range(1, 13)]}")

# ---------------------------------------------------------------- 京大理系2021
# 第1問 問1：平面 2x-2y+z=2 に関する P(1,1,1) の対称点
_n21r = (2.0, -2.0, 1.0)
_P21 = (1.0, 1.0, 1.0)
_Q21 = (13 / 9, 5 / 9, 11 / 9)
_M21 = tuple((_P21[i] + _Q21[i]) / 2 for i in range(3))
_cross21r = lambda u, v: (u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2],
                          u[0] * v[1] - u[1] * v[0])
_PQ21 = tuple(_Q21[i] - _P21[i] for i in range(3))
ok("京大理21-1問1 Q = (13/9, 5/9, 11/9)",
   abs(sum(_n21r[i] * _M21[i] for i in range(3)) - 2) < 1e-12
   and all(abs(c) < 1e-12 for c in _cross21r(_PQ21, _n21r)),
   f"中点 {tuple(round(v, 6) for v in _M21)} が平面上、PQ ∥ 法線")

# 第1問 問2：n 回目に初めて赤で、4色そろう
_ok21p = True
for _n in range(4, 9):
    _c = sum(1 for s_ in itertools.product("RWBY", repeat=_n)
             if s_[-1] == "R" and "R" not in s_[:-1] and set(s_[:-1]) == {"W", "B", "Y"})
    if Fraction(_c, 4 ** _n) != Fraction(3 ** (_n - 1) - 3 * 2 ** (_n - 1) + 3, 4 ** _n):
        _ok21p = False
ok("京大理21-1問2 (3^{n-1}-3·2^{n-1}+3)/4^n", _ok21p, "n=4..8 を全探索で確認")

# 第2問：接線と x 軸の交点までの距離の最小
def _L21(p):
    return math.hypot(p - (p * p - 1) / (2 * p), (p * p + 1) / 2)


_best21r = (9.0, None)
for _i in range(1, 2_000_000):
    _p = _i / 2_000_000 * 3
    _v = _L21(_p)
    if _v < _best21r[0]:
        _best21r = (_v, _p)
ok("京大理21-2 L の最小は 3√3/4",
   abs(_best21r[0] - 3 * math.sqrt(3) / 4) < 1e-7
   and abs(_best21r[1] - 1 / math.sqrt(2)) < 1e-4,
   f"最小 {_best21r[0]:.9f}（p={_best21r[1]:.6f}、1/√2 = {1 / math.sqrt(2):.6f}）")

# 第3問：Σ (1/2)^n cos(nπ/6)
_S21 = sum((0.5) ** n * math.cos(n * math.pi / 6) for n in range(400))
ok("京大理21-3 和は (14+3√3)/13",
   abs(_S21 - (14 + 3 * math.sqrt(3)) / 13) < 1e-12,
   f"部分和 {_S21:.12f}（厳密値 {(14 + 3 * math.sqrt(3)) / 13:.12f}）")

# 第4問：y=log(1+cos x) の 0≦x≦π/2 の弧長
_len21 = 0.0
_n21l = 2_000_000
for _i in range(_n21l):
    _x = (math.pi / 2) * (_i + 0.5) / _n21l
    _yp = -math.sin(_x) / (1 + math.cos(_x))
    _len21 += math.sqrt(1 + _yp * _yp) * (math.pi / 2) / _n21l
ok("京大理21-4 弧長は 2log(1+√2)",
   abs(_len21 - 2 * math.log(1 + math.sqrt(2))) < 1e-6,
   f"数値積分 {_len21:.9f}（厳密値 {2 * math.log(1 + math.sqrt(2)):.9f}）")

# 第5問：外心と垂心の軌跡
_B21 = (-math.sqrt(3), -1.0)
_C21 = (math.sqrt(3), -1.0)
_bad21h = 0
_ys21 = []
for _i in range(1, 2000):
    _th = math.pi * _i / 2000
    _A21 = (2 * math.cos(_th), 2 * math.sin(_th))
    if _A21[1] <= 0:
        continue
    _u = (_B21[0] - _A21[0], _B21[1] - _A21[1])
    _v = (_C21[0] - _A21[0], _C21[1] - _A21[1])
    _ang = math.degrees(math.acos((_u[0] * _v[0] + _u[1] * _v[1])
                                  / math.hypot(*_u) / math.hypot(*_v)))
    _H = (_A21[0] + _B21[0] + _C21[0], _A21[1] + _B21[1] + _C21[1])
    _ys21.append(_H[1])
    if abs(_ang - 60) > 1e-6 or abs(_H[0] ** 2 + (_H[1] + 2) ** 2 - 4) > 1e-9:
        _bad21h += 1
ok("京大理21-5 外心は原点、垂心の軌跡は x²+(y+2)²=4 の y>-2 の部分",
   _bad21h == 0 and min(_ys21) > -2 and max(_ys21) <= 1e-12,
   f"2000点で不一致 {_bad21h} 件、H の y は {min(_ys21):.6f} 〜 {max(_ys21):.6f}")

# 第6問 問1：3^n-2^n が素数なら n も素数
def _isp21(m):
    if m < 2:
        return False
    for d in range(2, int(m ** 0.5) + 1):
        if m % d == 0:
            return False
    return True


_pr21 = [n for n in range(2, 41) if _isp21(3 ** n - 2 ** n)]
ok("京大理21-6問1 3ⁿ-2ⁿ が素数なら n も素数",
   all(_isp21(n) for n in _pr21) and _pr21 == [2, 3, 5, 17, 29, 31],
   f"n≦40 で素数になるのは {_pr21}")

# 第6問 問2：f(a)=af(1) なら原点を通る接線がある
_rnd21r = random.Random(2021)
_bad21t = 0
for _ in range(2000):
    _a = _rnd21r.uniform(1.2, 4)
    _c1, _c2 = _rnd21r.uniform(-3, 3), _rnd21r.uniform(-3, 3)
    _c0 = _c2 * (_a - _a * _a) / (1 - _a)          # f(a)=a f(1) となるように
    _g = lambda x: (_c0 + _c1 * x + _c2 * x * x) - x * (_c1 + 2 * _c2 * x)
    if not any(_g(1 + (_a - 1) * k / 2000) * _g(1 + (_a - 1) * (k + 1) / 2000) <= 0
               for k in range(2000)):
        _bad21t += 1
ok("京大理21-6問2 (1,a) に f(t)=t f'(t) の解がある", _bad21t == 0,
   f"2次式 2000 個で反例 {_bad21t} 件")

# ---------------------------------------------------------------- 京大理系2020
# 第1問：3解が一辺 √3a の正三角形をなす
_a20r = 2 ** (-1 / 3)
_rt20 = [complex(-2 * _a20r, 0),
         complex(-_a20r / 2, _a20r * math.sqrt(3) / 2),
         complex(-_a20r / 2, -_a20r * math.sqrt(3) / 2)]
_e1 = -(_rt20[0] + _rt20[1] + _rt20[2])
_e2 = (_rt20[0] * _rt20[1] + _rt20[1] * _rt20[2] + _rt20[2] * _rt20[0])
_e3 = -(_rt20[0] * _rt20[1] * _rt20[2])
ok("京大理20-1 a=∛4/2、b=3∛2/2、3解は -∛4 と (∛4/4)(-1±√3i)",
   abs(_e1 - 3 * _a20r) < 1e-12 and abs(_e2 - 3 * _a20r ** 2) < 1e-12
   and abs(_e3 - 1) < 1e-12
   and abs(_a20r - 4 ** (1 / 3) / 2) < 1e-12
   and abs(3 * _a20r ** 2 - 3 * 2 ** (1 / 3) / 2) < 1e-12
   and all(abs(abs(_rt20[i] - _rt20[j]) - math.sqrt(3) * _a20r) < 1e-12
           for i, j in ((0, 1), (0, 2), (1, 2))),
   f"a = {_a20r:.9f}、b = {3 * _a20r ** 2:.9f}、辺 {abs(_rt20[0] - _rt20[1]):.9f}")

# 第2問：s_n は偶数の整数、極限は -π
_ok20s = True
for _p in (1, 2, 3, 5):
    _al = _p + math.sqrt(_p * _p + 1)
    _s = [2, 2 * _p]
    for _k in range(2, 45):
        _s.append(2 * _p * _s[-1] + _s[-2])
    if not all(x % 2 == 0 for x in _s[:40]):
        _ok20s = False
    if not all(abs(_al ** n + (_p - math.sqrt(_p * _p + 1)) ** n - _s[n]) < 1e-6
               for n in range(1, 10)):
        _ok20s = False
    if not all(abs(math.sin(_al ** n * math.pi)
                   + (-1) ** n * math.sin(math.pi / _al ** n)) < 1e-6
               for n in range(1, 9)):
        _ok20s = False
    if abs(-(_al ** 40) * math.sin(math.pi / _al ** 40) + math.pi) > 1e-9:
        _ok20s = False
ok("京大理20-2 α^n+β^n は偶数の整数、極限は -π", _ok20s,
   "p=1,2,3,5 で漸化式・恒等式・極限を確認")

# 第4問：B(f(m,n)) の最大
def _B20(a):
    b = 0
    while a % 3 == 0:
        a //= 3
        b += 1
    return b


_best20 = (-1, [])
for _m in range(1, 31):
    for _n in range(1, 31):
        if _n % 3 == 0:
            continue
        _v = _B20(_m ** 3 + _n * _n + _n + 3)
        if _v > _best20[0]:
            _best20 = (_v, [(_m, _n)])
        elif _v == _best20[0]:
            _best20[1].append((_m, _n))
ok("京大理20-4 最大は 4、(m,n)=(3,11),(12,11),(21,11),(30,11)",
   _best20[0] == 4 and _best20[1] == [(3, 11), (12, 11), (21, 11), (30, 11)],
   f"最大 {_best20[0]}、組 {_best20[1]}")

# 第6問：2回転してできる立体の体積
_vol20 = 0.0
_n20v = 2_000_000
for _i in range(_n20v):
    _x = -1 + 2 * (_i + 0.5) / _n20v
    _vol20 += math.pi * ((1 + math.log(2) - _x * _x) - math.log(1 + abs(_x))) * 2 / _n20v
ok("京大理20-6 体積は 2π(5/3 - log2)",
   abs(_vol20 - 2 * math.pi * (5 / 3 - math.log(2))) < 1e-6,
   f"数値積分 {_vol20:.9f}（厳密値 {2 * math.pi * (5 / 3 - math.log(2)):.9f}）")

# ---------------------------------------------------------------- 京大理系2019
# 第1問 問1：cosθ は無理数、cos2θ と cos3θ は有理数
ok("京大理19-1問1 θ = π/6",
   abs(math.cos(math.pi / 6) - math.sqrt(3) / 2) < 1e-15
   and abs(math.cos(2 * math.pi / 6) - 0.5) < 1e-15
   and abs(math.cos(3 * math.pi / 6)) < 1e-15,
   "cosθ=√3/2（無理数）、cos2θ=1/2、cos3θ=0")

# 第1問 問2：2つの定積分
_n19 = 2_000_000
_I1 = _I2 = 0.0
for _i in range(_n19):
    _x = (math.pi / 4) * (_i + 0.5) / _n19
    _I1 += _x / math.cos(_x) ** 2 * (math.pi / 4) / _n19
    _I2 += 1 / math.cos(_x) * (math.pi / 4) / _n19
ok("京大理19-1問2 π/4-(1/2)log2 と log(1+√2)",
   abs(_I1 - (math.pi / 4 - 0.5 * math.log(2))) < 1e-7
   and abs(_I2 - math.log(1 + math.sqrt(2))) < 1e-7,
   f"(1) {_I1:.9f}、(2) {_I2:.9f}")

# 第2問：|f(n)| と |f(n+1)| がともに素数
def _isp19(m):
    m = abs(m)
    if m < 2:
        return False
    for d in range(2, int(m ** 0.5) + 1):
        if m % d == 0:
            return False
    return True


_f19 = lambda x: x ** 3 + 2 * x * x + 2
_good19 = [n for n in range(-2000, 2001) if _isp19(_f19(n)) and _isp19(_f19(n + 1))]
ok("京大理19-2 n = -3, -2, -1, 0",
   _good19 == [-3, -2, -1, 0]
   and not [m for m in range(-50, 50) if m * m * (m + 2) == -4],
   f"-2000..2000 で {_good19}")

# 第3問：曲線 P(t) と線分 BC で囲む面積は S/3
_rnd19r = random.Random(2019)
_ok19a = True
for _ in range(5):
    _A = (_rnd19r.uniform(-3, 3), _rnd19r.uniform(-3, 3))
    _Bp = (_rnd19r.uniform(-3, 3), _rnd19r.uniform(-3, 3))
    _Cp = (_rnd19r.uniform(-3, 3), _rnd19r.uniform(-3, 3))
    _S19 = abs((_Bp[0] - _A[0]) * (_Cp[1] - _A[1]) - (_Bp[1] - _A[1]) * (_Cp[0] - _A[0])) / 2
    if _S19 < 0.5:
        continue
    _ar = 0.0
    _N = 200_000
    for _i in range(_N):
        _t = (_i + 0.5) / _N
        _P = tuple(_t * (1 - _t) * _A[k] + (1 - _t) * _Bp[k] + _t * _t * _Cp[k] for k in range(2))
        _dP = tuple((1 - 2 * _t) * _A[k] - _Bp[k] + 2 * _t * _Cp[k] for k in range(2))
        _ar += 0.5 * (_P[0] * _dP[1] - _P[1] * _dP[0]) / _N
    _ar += 0.5 * (_Cp[0] * (_Bp[1] - _Cp[1]) - _Cp[1] * (_Bp[0] - _Cp[0]))
    if abs(abs(_ar) - _S19 / 3) > 1e-5:
        _ok19a = False
ok("京大理19-3 囲む面積は S/3", _ok19a, "三角形3つで数値積分して確認")

# 第6問：(1+i)^n + (1-i)^n > 10^10 となる最小の n
_vals19 = {n: round(((1 + 1j) ** n + (1 - 1j) ** n).real) for n in range(1, 90)}
_min19 = min(n for n in range(1, 90) if _vals19[n] > 10 ** 10)
ok("京大理19-6 最小の n は 71",
   _min19 == 71 and _vals19[71] == 2 ** 36
   and _vals19[64] == 2 ** 33 and _vals19[65] == 2 ** 33 and 2 ** 33 < 10 ** 10
   and 33 * 0.3011 < 10 < 34 * 0.3010,
   f"n=71 で {_vals19[71]} = 2^36")

# ---- 九大理系2025 ----

# 第1問：平面 α の法線と、P から下ろした垂線が xy 平面と交わる点 Q
_n25 = None
_A25, _B25, _C25 = (1, 1, -5), (-1, -1, 7), (1, -1, 3)
_ab25 = tuple(_B25[k] - _A25[k] for k in range(3))
_ac25 = tuple(_C25[k] - _A25[k] for k in range(3))
_cr25 = (
    _ab25[1] * _ac25[2] - _ab25[2] * _ac25[1],
    _ab25[2] * _ac25[0] - _ab25[0] * _ac25[2],
    _ab25[0] * _ac25[1] - _ab25[1] * _ac25[0],
)
ok("九大理25-1 法線ベクトルは (2,4,1) の定数倍",
   _cr25 == (8, 16, 4) and all(_cr25[k] == 4 * (2, 4, 1)[k] for k in range(3)),
   f"外積 = {_cr25}")

_ok25q = True
random.seed(20250101)
for _ in range(200000):
    _a, _b, _t = (random.uniform(-9, 9) for _ in range(3))
    # P + s*(2,4,1) の z 成分が 0 になる s を解く
    _s = -_t
    _Q = (_a + 2 * _s, _b + 4 * _s, _t + _s)
    if abs(_Q[0] - (_a - 2 * _t)) > 1e-9 or abs(_Q[1] - (_b - 4 * _t)) > 1e-9 or abs(_Q[2]) > 1e-9:
        _ok25q = False
        break
ok("九大理25-1 Q = (a-2t, b-4t, 0)", _ok25q, "(a,b,t) を20万組とって確認")

_ok25m = True
for _a, _b in [(1, 0), (0, 1), (1, 2), (2, 1), (3, 1)]:
    _best = min(math.hypot(_a - 2 * (_i / 25000 - 4), _b - 4 * (_i / 25000 - 4)) for _i in range(200001))
    if abs(_best - abs(2 * _a - _b) / math.sqrt(5)) > 1e-5:
        _ok25m = False
ok("九大理25-1 min OQ = |2a-b|/√5、条件は |2a-b| ≦ √5", _ok25m,
   "t を20万点動かした直接計算と一致")

# 第2問：∫(tan^4 x - tan^2 x - 2)/(tan^2 x - 4) dx
_i25 = quad(lambda x: (math.tan(x) ** 4 - math.tan(x) ** 2 - 2) / (math.tan(x) ** 2 - 4), 0, math.pi / 4, 400001)[0]
ok("九大理25-2 積分は 1 - (1/2)log 3",
   abs(_i25 - (1 - 0.5 * math.log(3))) < 1e-7,
   f"数値積分 {_i25:.9f} / 1-(1/2)log3 = {1 - 0.5 * math.log(3):.9f}")

# 第3問：n^2 の 8 での余りと 2^m = n^2 + 3
ok("九大理25-3 n^2 mod 8 は 0,1,4 のみ",
   {n * n % 8 for n in range(-20, 21)} == {0, 1, 4},
   f"現れる余りは {sorted({n * n % 8 for n in range(-20, 21)})}")
_sol25 = [(m, n) for m in range(40) for n in range(10000) if 2 ** m == n * n + 3]
ok("九大理25-3 2^m = n^2+3 の解は (m,n)=(2,1) のみ", _sol25 == [(2, 1)], f"全探索 {_sol25}")

# 第4問：円に内接する A,B,C,D と交点 E
_PA25 = (1.0, 0.0)
_PB25 = (math.sqrt(2) / 2, math.sqrt(2) / 2)
_PC25 = (0.0, 1.0)
_PD25 = (-1.0, 0.0)
_d25 = lambda p, q: math.hypot(p[0] - q[0], p[1] - q[1])
ok("九大理25-4 配置が条件をみたす（AD が直径、AC=CD、AB=BC）",
   abs(_d25(_PA25, _PD25) - 2) < 1e-12
   and abs(_d25(_PA25, _PC25) - _d25(_PC25, _PD25)) < 1e-12
   and abs(_d25(_PA25, _PB25) - _d25(_PB25, _PC25)) < 1e-12
   and all(abs(math.hypot(*_p) - 1) < 1e-12 for _p in (_PA25, _PB25, _PC25, _PD25)),
   f"AC={_d25(_PA25, _PC25):.6f} AB={_d25(_PA25, _PB25):.6f}")
_v1_25 = (_PA25[0] - _PC25[0], _PA25[1] - _PC25[1])
_v2_25 = (_PB25[0] - _PC25[0], _PB25[1] - _PC25[1])
_ang25 = math.degrees(math.acos((_v1_25[0] * _v2_25[0] + _v1_25[1] * _v2_25[1])
                                / (math.hypot(*_v1_25) * math.hypot(*_v2_25))))
ok("九大理25-4 ∠ACB = 22.5° = π/8", abs(_ang25 - 22.5) < 1e-9, f"{_ang25:.6f}°")
ok("九大理25-4 BC = √(2-√2)",
   abs(_d25(_PB25, _PC25) - math.sqrt(2 - math.sqrt(2))) < 1e-12,
   f"{_d25(_PB25, _PC25):.9f}")
_PE25 = (math.sqrt(2) - 1, 2 - math.sqrt(2))
_cross25 = ((_PB25[0] - _PD25[0]) * (_PE25[1] - _PD25[1])
            - (_PB25[1] - _PD25[1]) * (_PE25[0] - _PD25[0]))
_S25 = 0.5 * abs((_PC25[0] - _PB25[0]) * (_PE25[1] - _PB25[1])
                 - (_PC25[1] - _PB25[1]) * (_PE25[0] - _PB25[0]))
ok("九大理25-4 E = (√2-1, 2-√2)、△BCE = (3-2√2)/2",
   abs(_PE25[0] + _PE25[1] - 1) < 1e-12 and abs(_cross25) < 1e-12
   and abs(_S25 - (3 - 2 * math.sqrt(2)) / 2) < 1e-12,
   f"面積 {_S25:.9f} / (3-2√2)/2 = {(3 - 2 * math.sqrt(2)) / 2:.9f}")

# 第5問：f(x) = (x^2-ax+b)(x-c) の実数解・自然数解の個数
def _roots25(a, b, c):
    rs = {Fraction(c)}
    d = a * a - 4 * b
    if d == 0:
        rs.add(Fraction(a, 2))
    elif d > 0:
        rs |= {("irr", a, b, 1), ("irr", a, b, -1)} if not math.isqrt(d) ** 2 == d else {
            Fraction(a + math.isqrt(d), 2), Fraction(a - math.isqrt(d), 2)}
    return rs

_cnt1_25 = _cnt3_25 = 0
for _a in range(1, 7):
    for _b in range(1, 7):
        for _c in range(1, 7):
            _rs = _roots25(_a, _b, _c)
            if len(_rs) == 1:
                _cnt1_25 += 1
            _nat = [r for r in _rs if isinstance(r, Fraction) and r.denominator == 1 and r > 0]
            if len(_nat) == 3:
                _cnt3_25 += 1
ok("九大理25-5 実数解がちょうど1個になる確率は 13/27",
   Fraction(_cnt1_25, 216) == Fraction(13, 27), f"{_cnt1_25}/216")
ok("九大理25-5 自然数解がちょうど3個になる確率は 5/54",
   Fraction(_cnt3_25, 216) == Fraction(5, 54), f"{_cnt3_25}/216")

# ---- 九大理系2024 ----

# 第1問：P(-1,1,-1), Q(1,1,1), R(a,a^2,a^3) の三角形
def _tri24(a):
    _P, _Q, _R = (-1, 1, -1), (1, 1, 1), (a, a * a, a ** 3)
    _u = tuple(_Q[k] - _P[k] for k in range(3))
    _v = tuple(_R[k] - _P[k] for k in range(3))
    _c = (_u[1] * _v[2] - _u[2] * _v[1],
          _u[2] * _v[0] - _u[0] * _v[2],
          _u[0] * _v[1] - _u[1] * _v[0])
    return 0.5 * math.sqrt(sum(x * x for x in _c))

ok("九大理24-1 面積は |a^2-1|√(a^2+2)",
   all(abs(_tri24(_i / 100) - abs((_i / 100) ** 2 - 1) * math.sqrt((_i / 100) ** 2 + 2)) < 1e-9
       for _i in range(-300, 301)),
   "a を -3〜3 まで 0.01 刻みで確認")
_mx24 = max((_tri24(_i / 200000), _i / 200000) for _i in range(-199999, 200000))
ok("九大理24-1 -1<a<1 での最大は a=0 の √2",
   abs(_mx24[0] - math.sqrt(2)) < 1e-9 and abs(_mx24[1]) < 1e-5,
   f"a={_mx24[1]:.5f} で {_mx24[0]:.10f}")

# 第2問：f(z) = z^6+z^4+z^2+1 = (z^2+1)(z^4+1) = (z^8-1)/(z^2-1)
_f24 = lambda z: z ** 6 + z ** 4 + z ** 2 + 1
_r8 = [complex(math.cos(math.pi * k / 4), math.sin(math.pi * k / 4)) for k in range(8)]
_S24 = [z for z in _r8 if abs(_f24(z)) < 1e-9]
ok("九大理24-2 解は 1 の8乗根から ±1 を除いた6個、すべて |z|=1",
   len(_S24) == 6 and all(abs(abs(z) - 1) < 1e-12 for z in _S24)
   and abs(_f24(1 + 0j)) > 1 and abs(_f24(-1 + 0j)) > 1,
   f"解 {len(_S24)} 個、f(1)={_f24(1 + 0j).real:.0f}")
_w24 = [k for k in range(8) if all(abs(_f24(_r8[k] * z)) < 1e-9 for z in _S24)]
ok("九大理24-2 条件をみたす w は 1 と -1 だけ", _w24 == [0, 4],
   f"1 の8乗根のうち k={_w24}（偏角 0°, 180°）")

# 第3問：階乗の不定方程式
_ft24 = [math.factorial(k) for k in range(0, 80)]
ok("九大理24-3(1) a<b なら b!/a! ≧ b",
   all(_ft24[b] // _ft24[a] >= b for a in range(1, 40) for b in range(a + 1, 60)),
   "1 ≦ a < b ≦ 59 で確認")
_s24b = [(a, b) for a in range(1, 60) for b in range(1, 60) if 2 * _ft24[a] == _ft24[b]]
ok("九大理24-3(2) 2·a! = b! の解は (1,2) のみ", _s24b == [(1, 2)], f"全探索 {_s24b}")
_s24c = [(a, b, c) for a in range(1, 40) for b in range(1, 40) for c in range(1, 40)
         if _ft24[a] + _ft24[b] == 2 * _ft24[c]]
ok("九大理24-3(3) a!+b! = 2·c! の解は a=b=c のみ",
   len(_s24c) == 39 and all(t[0] == t[1] == t[2] for t in _s24c),
   f"{len(_s24c)} 組すべて a=b=c")

# 第4問：n×n の格子点のうち3点以上を通る直線の本数 L(n)
def _L24(n):
    pts = [(x, y) for x in range(1, n + 1) for y in range(1, n + 1)]
    lines = set()
    for p, q in itertools.combinations(pts, 2):
        A, B = q[1] - p[1], p[0] - q[0]
        C = -(A * p[0] + B * p[1])
        g = math.gcd(math.gcd(abs(A), abs(B)), abs(C))
        A, B, C = A // g, B // g, C // g
        if A < 0 or (A == 0 and B < 0):
            A, B, C = -A, -B, -C
        lines.add((A, B, C))
    return sum(1 for (A, B, C) in lines
               if sum(1 for (x, y) in pts if A * x + B * y + C == 0) >= 3)

ok("九大理24-4 L(3)=8, L(4)=14, L(5)=32",
   (_L24(3), _L24(4), _L24(5)) == (8, 14, 32),
   f"全探索 {(_L24(3), _L24(4), _L24(5))}")

# 第5問：I(m,n) = ∫[1,e] x^m e^x (log x)^n dx
_I24 = lambda m, n: quad(lambda x: x ** m * math.exp(x) * math.log(x) ** n, 1, math.e, 100001)[0]
_ok24i = True
for _m in range(1, 4):
    for _n in range(1, 4):
        _lhs = _I24(_m + 1, _n + 1)
        _rhs = math.e ** (_m + math.e + 1) - (_m + 1) * _I24(_m, _n + 1) - (_n + 1) * _I24(_m, _n)
        if abs(_lhs - _rhs) > 1e-6 * max(1.0, abs(_lhs)):
            _ok24i = False
ok("九大理24-5 I(m+1,n+1) = e^(m+e+1) - (m+1)I(m,n+1) - (n+1)I(m,n)", _ok24i,
   "m,n = 1,2,3 の9通りで数値積分して確認")
_vals24 = [_I24(2, _n) for _n in (1, 5, 20, 80)]
ok("九大理24-5 I(m,n) → 0（評価 e^(m+e+1)/(n+1) の下にある）",
   all(_vals24[k] > _vals24[k + 1] for k in range(3))
   and all(_v <= math.e ** (2 + math.e + 1) / (_n + 1)
           for _v, _n in zip(_vals24, (1, 5, 20, 80))),
   "I(2,n) = " + ", ".join(f"{_v:.3f}" for _v in _vals24))

# ---- 九大理系2023 ----

# 第1問：相反方程式と、正三角形になる条件
_r23 = [complex(0.5, math.sqrt(3) / 2), complex(0.5, -math.sqrt(3) / 2)]
_p23 = lambda z: z ** 4 - 2 * z ** 3 + 3 * z ** 2 - 2 * z + 1
_dp23 = lambda z: 4 * z ** 3 - 6 * z ** 2 + 6 * z - 2
ok("九大理23-1 解は (1±√3i)/2 でどちらも重解",
   all(abs(_p23(z)) < 1e-12 and abs(_dp23(z)) < 1e-12 for z in _r23),
   "4次式と導関数の両方が 0")

random.seed(20230101)
_ok23a = True
for _ in range(20000):
    _p = complex(random.uniform(-3, 3), random.uniform(-3, 3))
    _q = complex(random.uniform(-3, 3), random.uniform(-3, 3))
    _r = -_p - _q
    if abs((_p ** 4 + _q ** 4 + _r ** 4) - (_p * _p + _q * _q + _r * _r) ** 2 / 2) > 1e-8:
        _ok23a = False
        break
ok("九大理23-1 p+q+r=0 なら p⁴+q⁴+r⁴ = (p²+q²+r²)²/2", _ok23a, "2万組で確認")

_tri23 = lambda a, b, c: abs((a - b) ** 4 + (b - c) ** 4 + (c - a) ** 4)
_eq23 = (0j, 1 + 0j, complex(0.5, math.sqrt(3) / 2))
ok("九大理23-1 正三角形でのみ与式が 0",
   _tri23(*_eq23) < 1e-12
   and _tri23(0j, 1 + 0j, 1j) > 1e-6
   and _tri23(0j, 2 + 0j, complex(0.3, 1.1)) > 1e-6,
   f"正三角形 {_tri23(*_eq23):.1e} / 直角二等辺 {_tri23(0j, 1 + 0j, 1j):.3f}")

# 第2問：a_{n+1} = |a_n - 1| + a_n - 1
def _seq23(al, N=200):
    a = al
    for _ in range(N):
        a = abs(a - 1) + a - 1
    return a

ok("九大理23-2 α≦1、1<α<3/2、3/2≦α<2 では 0 に収束",
   all(abs(_seq23(_al)) < 1e-12 for _al in (-5, 0, 1, 1.2, 1.49, 1.5, 1.7, 1.99)),
   "α を8通りとって a_200 = 0")
ok("九大理23-2 α>2 では正の無限大に発散（α=2 だけ 2 のまま）",
   abs(_seq23(2) - 2) < 1e-12 and _seq23(2.0001) > 1e50 and _seq23(3) > 1e50,
   f"α=2.0001 で a_200 = {_seq23(2.0001):.3g}")

# 第3問：m=(a,c), n=(b,d), D=ad-bc
random.seed(20230303)
_ok23v = True
for _ in range(20000):
    _a, _b, _c, _d = (random.uniform(-3, 3) for _ in range(4))
    _D = _a * _d - _b * _c
    if abs(_D) < 1e-3:
        continue
    _v = (_d / _D, -_b / _D)
    _w = (-_c / _D, _a / _D)
    _m, _n = (_a, _c), (_b, _d)
    _dot = lambda u, z: u[0] * z[0] + u[1] * z[1]
    if (abs(_dot(_m, _v) - 1) > 1e-6 or abs(_dot(_n, _w) - 1) > 1e-6
            or abs(_dot(_m, _w)) > 1e-6 or abs(_dot(_n, _v)) > 1e-6):
        _ok23v = False
        break
ok("九大理23-3 v=(d/D, -b/D)、w=(-c/D, a/D)", _ok23v, "2万組で4つの内積を確認")

_ds23 = set()
for _a in range(-4, 5):
    for _b in range(-4, 5):
        for _c in range(-4, 5):
            for _d in range(-4, 5):
                _D = _a * _d - _b * _c
                if _D == 0:
                    continue
                if all((_q1 * _d - _q2 * _b) % _D == 0 and (-_q1 * _c + _q2 * _a) % _D == 0
                       for _q1 in range(-3, 4) for _q2 in range(-3, 4)):
                    _ds23.add(_D)
ok("九大理23-3 D のとりうる値は ±1 のみ", sorted(_ds23) == [-1, 1], f"全探索 {sorted(_ds23)}")

# 第4問：f(x)=e^{ax}cos bx, g(x)=e^{ax}sin bx
random.seed(20230404)
_ok23f = True
for _ in range(20000):
    _a = random.uniform(-2, 2)
    _b = random.choice((1, -1)) * random.uniform(0.2, 2)
    _x, _y = random.uniform(-2, 2), random.uniform(-2, 2)
    _f = lambda t: math.exp(_a * t) * math.cos(_b * t)
    _g = lambda t: math.exp(_a * t) * math.sin(_b * t)
    if (abs(_f(_x + _y) - (_f(_x) * _f(_y) - _g(_x) * _g(_y))) > 1e-8
            or abs(_g(_x + _y) - (_f(_x) * _g(_y) + _g(_x) * _f(_y))) > 1e-8):
        _ok23f = False
        break
ok("九大理23-4 f=e^{ax}cos bx, g=e^{ax}sin bx が加法定理 (A)(B) をみたす", _ok23f, "2万組で確認")
_h23 = 1e-6
_ok23d = True
for _a, _b in ((0.7, 1.3), (-1.1, 0.4)):
    _f = lambda t: math.exp(_a * t) * math.cos(_b * t)
    _g = lambda t: math.exp(_a * t) * math.sin(_b * t)
    if (abs(_f(0) - 1) > 1e-12 or abs(_g(0)) > 1e-12
            or abs((_f(_h23) - _f(-_h23)) / (2 * _h23) - _a) > 1e-5
            or abs((_g(_h23) - _g(-_h23)) / (2 * _h23) - _b) > 1e-5):
        _ok23d = False
ok("九大理23-4 f(0)=1, g(0)=0, f'(0)=a, g'(0)=b", _ok23d, "数値微分で確認")

# 第5問：x = t + 2sin²t, y = t + sin t
_X23 = lambda t: t + 2 * math.sin(t) ** 2
_Y23 = lambda t: t + math.sin(t)
_dx23 = lambda t: 1 + 2 * math.sin(2 * t)
_t23 = (7 * math.pi / 12, 11 * math.pi / 12)
ok("九大理23-5 y 軸に平行な接線は2本",
   all(abs(_dx23(_t)) < 1e-12 and 1 + math.cos(_t) > 0 for _t in _t23)
   and abs(_X23(_t23[0]) - _X23(_t23[1])) > 0.5,
   f"x = {_X23(_t23[0]):.6f}, {_X23(_t23[1]):.6f}")
_S23 = quad(lambda t: (_X23(t) - _Y23(t)) * (1 + math.cos(t)), math.pi / 6, 5 * math.pi / 6, 2000001)[0]
ok("九大理23-5 面積は 2π/3 - √3/2",
   abs(_S23 - (2 * math.pi / 3 - math.sqrt(3) / 2)) < 1e-9,
   f"数値積分 {_S23:.10f} / 2π/3-√3/2 = {2 * math.pi / 3 - math.sqrt(3) / 2:.10f}")

# ---- 九大理系2022 ----

# 第1問：平面 α（O, A, B を通る）と、対称点・折れ線の最短
_A22, _B22 = (1, 1, 0), (2, 1, 2)
_P22, _Q22 = (4, 0, -1), (4, 0, 5)
_cr22 = (_A22[1] * _B22[2] - _A22[2] * _B22[1],
         _A22[2] * _B22[0] - _A22[0] * _B22[2],
         _A22[0] * _B22[1] - _A22[1] * _B22[0])
_n22 = tuple(c / 3 for c in _cr22)
_dot3 = lambda u, v: sum(u[k] * v[k] for k in range(3))
ok("九大理22-1 n = (2,-2,-1)/3（a,b に垂直・大きさ1・x 成分が正）",
   _cr22 == (2, -2, -1) and abs(_dot3(_A22, _n22)) < 1e-12 and abs(_dot3(_B22, _n22)) < 1e-12
   and abs(_dot3(_n22, _n22) - 1) < 1e-12 and _n22[0] > 0,
   f"a×b = {_cr22}")

_d22 = _dot3(_P22, _n22)
_Pp22 = tuple(_P22[k] - 2 * _d22 * _n22[k] for k in range(3))
_mid22 = tuple((_P22[k] + _Pp22[k]) / 2 for k in range(3))
ok("九大理22-1 P' = (0,4,1)",
   all(abs(_Pp22[k] - (0, 4, 1)[k]) < 1e-12 for k in range(3))
   and abs(_dot3(_mid22, _n22)) < 1e-12,
   f"d = {_d22:.1f}、中点 {tuple(round(v, 6) for v in _mid22)} は平面上")

_R22 = (3, 1, 4)
_best22 = (1e18, None)
for _i in range(-200, 201):
    for _j in range(-200, 201):
        _u, _v = _i / 50, _j / 50
        _X = tuple(_u * _A22[k] + _v * _B22[k] for k in range(3))
        _val = math.dist(_X, _P22) + math.dist(_X, _Q22)
        if _val < _best22[0]:
            _best22 = (_val, _X)
ok("九大理22-1 R = (3,1,4)、最小値は 4√3",
   abs(_dot3(_R22, _n22)) < 1e-12
   and abs(math.dist(_R22, _P22) + math.dist(_R22, _Q22) - 4 * math.sqrt(3)) < 1e-12
   and abs(_best22[0] - 4 * math.sqrt(3)) < 1e-9,
   f"格子探索の最小 {_best22[0]:.6f} / 4√3 = {4 * math.sqrt(3):.6f}")

# 第2問：x^n を (x-α)(x-β)^2 で割ったときの A, B, C
def _ABC22(n, al, be):
    C = al ** n
    B = (be ** n - al ** n) / (be - al)
    A = (n * be ** (n - 1) * (be - al) - (be ** n - al ** n)) / (be - al) ** 2
    return A, B, C

random.seed(20220202)
_ok22 = True
for _ in range(3000):
    _n = random.randint(3, 9)
    _al, _be = random.uniform(-3, 3), random.uniform(-3, 3)
    if abs(_al - _be) < 0.2:
        continue
    _A, _B, _C = _ABC22(_n, _al, _be)
    _f = lambda x: x ** _n - _A * (x - _al) * (x - _be) - _B * (x - _al) - _C
    _df = lambda x: _n * x ** (_n - 1) - _A * ((x - _be) + (x - _al)) - _B
    _sc = max(1.0, abs(_al) ** _n, abs(_be) ** _n)
    if abs(_f(_al)) > 1e-6 * _sc or abs(_f(_be)) > 1e-6 * _sc or abs(_df(_be)) > 1e-6 * _sc:
        _ok22 = False
        break
ok("九大理22-2 C=α^n, B=(β^n-α^n)/(β-α), A の式", _ok22,
   "3000 組で (x-α)(x-β)² で割り切れることを確認")

_ok22l = True
for _n, _al in ((3, 2.0), (5, 1.5), (7, -1.2)):
    _lim = _ABC22(_n, _al, _al + 1e-5)[0]
    if abs(_lim - _n * (_n - 1) / 2 * _al ** (_n - 2)) > 2e-3 * max(1.0, abs(_al) ** (_n - 2)):
        _ok22l = False
ok("九大理22-2 β→α で A → n(n-1)/2・α^(n-2)", _ok22l,
   "n=3,5,7 で β=α+10⁻⁵ として確認")

# 第3問：n^4 = 1 + 210 m^2
_s22 = [(m, n) for n in range(1, 300) for m in range(1, 2000) if n ** 4 == 1 + 210 * m * m]
ok("九大理22-3 (m,n) = (116,41)、n²-1 は 168 の倍数",
   _s22 == [(116, 41)] and (41 ** 2 - 1) % 168 == 0,
   f"全探索 {_s22}、(41²-1)/168 = {(41 ** 2 - 1) // 168}")

# 第4問：増加関数に対する区分求積の評価 ③
_ok22r = True
for _f22 in (lambda x: x ** 3 + math.exp(x), lambda x: math.sqrt(x + 1)):
    _I = quad(_f22, 0, 1, 200001)[0]
    for _n in (10, 100, 1000):
        _S = sum(_f22((_i - 1) / _n) for _i in range(1, _n + 1)) / _n
        if not (-1e-9 <= _I - _S <= (_f22(1) - _f22(0)) / _n + 1e-9):
            _ok22r = False
ok("九大理22-4 0 ≦ ∫f - S_n ≦ (f(1)-f(0))/n", _ok22r,
   "増加関数2つ × n=10,100,1000 で確認")

# 第5問：x = 5cos t + cos 5t, y = 5 sin t - sin 5t
_X22 = lambda t: 5 * math.cos(t) + math.cos(5 * t)
_Y22 = lambda t: 5 * math.sin(t) - math.sin(5 * t)
_dX22 = lambda t: -10 * math.sin(3 * t) * math.cos(2 * t)
_dY22 = lambda t: 10 * math.sin(3 * t) * math.sin(2 * t)
_h22 = 1e-6
ok("九大理22-5 dx/dt = -10 sin3t cos2t、dy/dt = 10 sin3t sin2t",
   all(abs(_dX22(t) - (_X22(t + _h22) - _X22(t - _h22)) / (2 * _h22)) < 1e-4
       and abs(_dY22(t) - (_Y22(t + _h22) - _Y22(t - _h22)) / (2 * _h22)) < 1e-4
       for t in (0.1, 0.3, 0.5, 1.4, 2.7)),
   "数値微分と一致")
ok("九大理22-5 0<t<π/6 で dx/dt<0、dy/dx = -tan2t < 0",
   all(_dX22(t) < 0 and abs(_dY22(t) / _dX22(t) + math.tan(2 * t)) < 1e-9
       and _dY22(t) / _dX22(t) < 0 for t in (0.01, 0.2, 0.4, 0.52)),
   "4点で確認")
_S22a = quad(lambda t: _X22(t) * _dY22(t) - _Y22(t) * _dX22(t), 0, math.pi / 6, 400001)[0] / 2
ok("九大理22-5 面積は 5π/3",
   abs(_S22a - 5 * math.pi / 3) < 1e-9
   and abs(_X22(math.pi / 6) - 2 * math.sqrt(3)) < 1e-12 and abs(_Y22(math.pi / 6) - 2) < 1e-12,
   f"数値積分 {_S22a:.7f} / 5π/3 = {5 * math.pi / 3:.7f}")
_z22 = lambda t: 5 * cmath.exp(1j * t) + cmath.exp(-5j * t)
ok("九大理22-5 x 軸対称と π/3 回転で C に移る",
   all(abs(_X22(-t) - _X22(t)) < 1e-12 and abs(_Y22(-t) + _Y22(t)) < 1e-12
       and abs(cmath.exp(1j * math.pi / 3) * _z22(t) - _z22(t + math.pi / 3)) < 1e-12
       for t in (0.3, 1.1, -2.5)),
   "z(t) = 5e^{it} + e^{-5it} で確認")
_r22 = [abs(_z22(_k * math.pi / 300)) for _k in range(601)]
ok("九大理22-5 |z| は 4 と 6 の間を動き、尖点 t=kπ/3 で 6",
   abs(min(_r22) - 4) < 1e-9 and abs(max(_r22) - 6) < 1e-9
   and all(abs(abs(_z22(_k * math.pi / 3)) - 6) < 1e-12 for _k in range(6)),
   f"最小 {min(_r22):.6f}、最大 {max(_r22):.6f}")

# ---- 九大理系2021 ----

# 第1問：四面体 OABC の内接球と、座標平面に接する球の切り口
_pl21 = lambda c: abs(2 * c[0] + 2 * c[1] + c[2] - 2) / 3
ok("九大理21-1 内接球の中心は (1/4,1/4,1/4)",
   abs(_pl21((0.25, 0.25, 0.25)) - 0.25) < 1e-12,
   "3つの座標平面までの距離も 0.25")
_S21 = lambda r: math.pi * (r * r - _pl21((r, r, r)) ** 2)
_mx21 = max((_S21(_i / 20000 * 1.2), _i / 20000 * 1.2) for _i in range(1, 20001)
            if _pl21((_i / 20000 * 1.2,) * 3) < _i / 20000 * 1.2)
ok("九大理21-1 交わりの円の面積の最大は π/4（r=5/8）",
   abs(_mx21[0] - math.pi / 4) < 1e-7 and abs(_mx21[1] - 0.625) < 1e-4,
   f"r={_mx21[1]:.6f} で {_mx21[0]:.9f} / π/4 = {math.pi / 4:.9f}")

# 第2問：x² - (4cosθ)x + 1/tanθ = 0
_D21 = lambda th: 4 * math.cos(th) ** 2 - 1 / math.tan(th)
ok("九大理21-2 実数解をもたないのは 0<θ<π/12",
   _D21(math.pi / 24) < 0 and _D21(math.pi / 12 - 1e-9) < 0
   and _D21(math.pi / 12 + 1e-9) > 0 and _D21(math.pi / 8) > 0,
   f"θ=π/24 で D/4={_D21(math.pi / 24):.6f}、θ=π/8 で {_D21(math.pi / 8):.6f}")

def _abg21(th):
    _s = math.sqrt(1 / math.tan(th) - 4 * math.cos(th) ** 2)
    return complex(2 * math.cos(th), _s), complex(2 * math.cos(th), -_s), 1 / (4 * math.sin(th))

ok("九大理21-2 外心は γ = 1/(4 sinθ)",
   all(abs(abs(_g) - abs(_g - _al)) < 1e-9 and abs(abs(_g) - abs(_g - _be)) < 1e-9
       for _th in (0.05, 0.1, 0.2) for _al, _be, _g in [_abg21(_th)]),
   "θ=0.05,0.1,0.2 で O, A, B までの距離が一致")

_th21 = math.asin(0.25) / 2
_al21, _be21, _g21 = _abg21(_th21)
ok("九大理21-2 直角になるのは sin2θ=1/4、tanθ = 4-√15",
   abs(_g21 - 2 * math.cos(_th21)) < 1e-12
   and abs(math.tan(_th21) - (4 - math.sqrt(15))) < 1e-12
   and 0 < math.tan(_th21) < 2 - math.sqrt(3),
   f"tanθ = {math.tan(_th21):.9f} / 4-√15 = {4 - math.sqrt(15):.9f}")

# 第3問：すべての t で y ≦ e^t - xt
random.seed(20210303)
_ok21m = True
for _ in range(20000):
    _x = random.uniform(0.01, 5)
    _m = min(math.exp(_t) - _x * _t
             for _t in (math.log(_x) + _k / 200 for _k in range(-600, 601)))
    if abs(_m - (_x - _x * math.log(_x))) > 1e-6:
        _ok21m = False
        break
ok("九大理21-3 min_t(e^t - xt) = x - x log x（x>0）", _ok21m, "2万通りで確認")
ok("九大理21-3 x<0 では下に有界でない",
   min(math.exp(-_k) + (-1) * _k for _k in range(0, 60)) < -50,
   "x=-1 で t=-59 まで下がる")
_V21 = math.pi * quad(lambda x: (x * (1 - math.log(x))) ** 2, 1, math.e, 400001)[0]
ok("九大理21-3 体積は π(2e³-17)/27",
   abs(_V21 - math.pi * (2 * math.e ** 3 - 17) / 27) < 1e-9,
   f"数値積分 {_V21:.8f} / π(2e³-17)/27 = {math.pi * (2 * math.e ** 3 - 17) / 27:.8f}")

# 第4問：平均値の性質
def _minmv21(f, df, al, be, N=400000):
    _rhs = (f(be) - f(al)) / (be - al)
    return min(abs(df(al + (be - al) * _i / N) - _rhs) for _i in range(N + 1))

ok("九大理21-4 n=2 では γ が中点になる",
   abs((complex(1, 2) + complex(-3, 1)) / 2 - complex(-1, 1.5)) < 1e-12
   and abs(6 * complex(-1, 1.5) - 2
           - ((3 * complex(-3, 1) ** 2 - 2 * complex(-3, 1) + 5)
              - (3 * complex(1, 2) ** 2 - 2 * complex(1, 2) + 5)) / (complex(-3, 1) - complex(1, 2))) < 1e-12,
   "α=1+2i, β=-3+i, f=3x²-2x+5 で確認")

_mv21 = {_a: _minmv21(lambda z, _a=_a: z ** 3 + _a * z * z + 2 * z + 1,
                      lambda z, _a=_a: 3 * z * z + 2 * _a * z + 2,
                      complex(1, -1), complex(1, 1))
         for _a in (-3, -2, 0, 1)}
ok("九大理21-4 平均値の性質をもつのは a=-3 のときだけ",
   _mv21[-3] < 1e-5 and all(_mv21[_a] > 0.5 for _a in (-2, 0, 1)),
   "最小 |f'(γ)-左辺| = " + ", ".join(f"a={_a}:{_v:.3f}" for _a, _v in _mv21.items()))

_al7 = complex(1, -1) / math.sqrt(2)
_be7 = complex(1, 1) / math.sqrt(2)
_m7 = _minmv21(lambda z: z ** 7, lambda z: 7 * z ** 6, _al7, _be7)
ok("九大理21-4 x^7 は平均値の性質をもたない",
   _m7 > 0.5 and abs((_be7 ** 7 - _al7 ** 7) / (_be7 - _al7) + 1) < 1e-12
   and abs((2 / 3) ** 3 - 1 / 7) > 0.1,
   f"線分上の最小 {_m7:.6f}、r⁶=8/27={8 / 27:.6f} ≠ 1/7={1 / 7:.6f}")

# 第5問：nCk と素数
ok("九大理21-5 2≦k≦n-2 なら nCk > n",
   all(math.comb(_n, _k) > _n for _n in range(4, 60) for _k in range(2, _n - 1)),
   "4 ≦ n ≦ 59 で確認")
_pr21 = [_p for _p in range(2, 200) if all(_p % _q for _q in range(2, int(_p ** 0.5) + 1))]
_set21 = {}
for _n in range(1, 300):
    for _k in range(1, _n + 1):
        _v = math.comb(_n, _k)
        if _v in _pr21:
            _set21.setdefault(_v, []).append((_n, _k))
ok("九大理21-5 nCk = p となるのは (p,1) と (p,p-1) だけ",
   all(_set21[_p] == ([(_p, 1)] if _p == 2 else [(_p, 1), (_p, _p - 1)]) for _p in _pr21),
   f"p=2:{_set21[2]}, p=3:{_set21[3]}, p=5:{_set21[5]}")

# ---- 九大理系2020 ----

# 第1問：(a,0) を通り y = e^{-x} - e^{-2x} に接する直線
_f20 = lambda x: math.exp(-x) - math.exp(-2 * x)
_df20 = lambda x: -math.exp(-x) + 2 * math.exp(-2 * x)
_g20 = lambda u: -math.log(u) + (u - 1) / (2 * u - 1)
_ok20a = True
for _i in range(1, 4000):
    _t = -4 + _i * 8 / 4000
    _u = math.exp(-_t)
    if abs(2 * _u - 1) < 1e-6:
        continue
    if abs((_t - _f20(_t) / _df20(_t)) - _g20(_u)) > 1e-7:
        _ok20a = False
        break
ok("九大理20-1 a = -log u + (u-1)/(2u-1)（u = e^{-t}）", _ok20a, "t を4000点で確認")

_lo20 = 2 * math.log(2) + 1.5
_hit20 = 0
for _i in range(1, 2000000):
    _u = _i / 200000.0
    if abs(2 * _u - 1) < 1e-9:
        continue
    if 1e-6 < _g20(_u) < _lo20 - 1e-6:
        _hit20 += 1
ok("九大理20-1 a ≦ 0 または a ≧ 3/2 + 2log2",
   _hit20 == 0 and abs(_g20(0.25) - _lo20) < 1e-12 and abs(_g20(1.0)) < 1e-12,
   f"(0, {_lo20:.6f}) に入る値は {_hit20} 個、g(1/4)={_g20(0.25):.6f}、g(1)={_g20(1.0):.6f}")

# 第2問：f(x) = x^4 + ax^3 + bx^2 + cx + d、f((1+√3i)/2) = 0
_w20 = complex(0.5, math.sqrt(3) / 2)
_f20p = lambda x, a, b: x ** 4 + a * x ** 3 + b * x ** 2 + (1 - b) * x + (a + b)
ok("九大理20-2 c = 1-b, d = a+b なら f(ω)=0",
   all(abs(_f20p(_w20, _a, _b)) < 1e-9
       for _a in (-3, 0, 6, 11) for _b in (-5, 2, 29)),
   "ω = (1+√3i)/2 で確認")

_cand20 = [(_a, _b) for _a in range(-40, 41) for _b in range(-40, 41)
           if (2 * _a + _b + 2) % 7 == 1 and (2 * _a + _b + 2) % 11 == 10
           and (3 * _b) % 7 == 3 and (3 * _b) % 11 == 10]
ok("九大理20-2 (a,b) = (6,29)、解は (1±√3i)/2 と (-7±√91 i)/2",
   _cand20 == [(6, 29)]
   and all(abs(_f20p(_z, 6, 29)) < 1e-6
           for _z in (_w20, _w20.conjugate(),
                      complex(-3.5, math.sqrt(91) / 2), complex(-3.5, -math.sqrt(91) / 2))),
   f"全探索 {_cand20}、f(1)={int(_f20p(1, 6, 29).real) if isinstance(_f20p(1, 6, 29), complex) else _f20p(1, 6, 29)}")

# 第3問：中点を結ぶ3直線が互いに直交する四面体
_U20, _V20, _W20 = math.sqrt(12), math.sqrt(8), 2.0
_u20, _v20, _w20v = (_U20, 0, 0), (0, _V20, 0), (0, 0, _W20)
_mid20 = lambda p, q: tuple((p[k] + q[k]) / 2 for k in range(3))
_O20 = (0.0, 0.0, 0.0)
_A20 = _mid20(_v20, _w20v)
_B20 = _mid20(_w20v, _u20)
_C20 = _mid20(_u20, _v20)
_dot20 = lambda p, q: sum(p[k] * q[k] for k in range(3))
_l20 = tuple(_mid20(_B20, _C20)[k] - _mid20(_O20, _A20)[k] for k in range(3))
_m20 = tuple(_mid20(_C20, _A20)[k] - _mid20(_O20, _B20)[k] for k in range(3))
_n20 = tuple(_mid20(_A20, _B20)[k] - _mid20(_O20, _C20)[k] for k in range(3))
ok("九大理20-3 |u|²=12, |v|²=8, |w|²=4 で条件がすべて成り立つ",
   abs(math.dist(_A20, _B20) - math.sqrt(5)) < 1e-12
   and abs(math.dist(_B20, _C20) - math.sqrt(3)) < 1e-12
   and abs(math.dist(_C20, _A20) - 2) < 1e-12
   and abs(_dot20(_l20, _m20)) < 1e-12 and abs(_dot20(_m20, _n20)) < 1e-12
   and abs(_dot20(_n20, _l20)) < 1e-12,
   f"AB={math.dist(_A20, _B20):.6f}, BC={math.dist(_B20, _C20):.6f}, CA={math.dist(_C20, _A20):.6f}")

_ca20 = tuple(_A20[k] - _C20[k] for k in range(3))
_cos20 = abs(_dot20(_B20, _ca20)) / (math.sqrt(_dot20(_B20, _B20)) * math.sqrt(_dot20(_ca20, _ca20)))
_G20c = tuple((_A20[k] + _B20[k] + _C20[k]) / 4 for k in range(3))
ok("九大理20-3 OB と CA のなす角は π/3、外接球の半径は √6/2",
   abs(math.degrees(math.acos(_cos20)) - 60) < 1e-9
   and all(abs(math.dist(_G20c, _P) - math.sqrt(6) / 2) < 1e-12
           for _P in (_O20, _A20, _B20, _C20)),
   f"角 {math.degrees(math.acos(_cos20)):.6f}°、半径 {math.dist(_G20c, _O20):.9f} / √6/2 = {math.sqrt(6) / 2:.9f}")

# 第4問：4個のサイコロの積
_c25 = _c4 = _c100 = 0
for _d in itertools.product(range(1, 7), repeat=4):
    _X = _d[0] * _d[1] * _d[2] * _d[3]
    if _X % 25 == 0:
        _c25 += 1
    if _X % 4 == 0:
        _c4 += 1
    if _X % 100 == 0:
        _c100 += 1
ok("九大理20-4 25 の倍数 19/144、4 の倍数 37/48、100 の倍数 41/648",
   Fraction(_c25, 1296) == Fraction(19, 144)
   and Fraction(_c4, 1296) == Fraction(37, 48)
   and Fraction(_c100, 1296) == Fraction(41, 648),
   f"{_c25}/1296, {_c4}/1296, {_c100}/1296")

# 第5問：円柱を平面 z = y で切った立体 T
_VT20 = quad(lambda t: 4 * math.sqrt(max(0.0, 1 - t * t)), -1, 1, 400001)[0]
ok("九大理20-5 S(t) = 4√(1-t²)、T の体積は 2π",
   abs(_VT20 - 2 * math.pi) < 1e-6,
   f"数値積分 {_VT20:.7f} / 2π = {2 * math.pi:.7f}")
_VR20 = quad(lambda t: math.pi * (5 - t * t + 12 * math.sqrt(max(0.0, 1 - t * t))), -1, 1, 400001)[0]
ok("九大理20-5 回転体の体積は 28π/3 + 6π²",
   abs(_VR20 - (28 * math.pi / 3 + 6 * math.pi ** 2)) < 1e-5,
   f"数値積分 {_VR20:.7f} / 28π/3+6π² = {28 * math.pi / 3 + 6 * math.pi ** 2:.7f}")
random.seed(20200505)
_N20 = 600000
_hit20r = 0
_RX, _RY = 1.0, 3 * math.sqrt(2)
for _ in range(_N20):
    _x = random.uniform(-_RX, _RX)
    _y = random.uniform(-_RY, _RY)
    _z = random.uniform(-_RY, _RY)
    _r = math.hypot(_y, _z)
    _s = math.sqrt(max(0.0, 1 - _x * _x))
    if 2 - _s <= _r <= math.sqrt(2) * (2 + _s):
        _hit20r += 1
_mc20 = _hit20r / _N20 * (2 * _RX * 2 * _RY * 2 * _RY)
ok("九大理20-5 回転体をモンテカルロでも確認",
   abs(_mc20 - (28 * math.pi / 3 + 6 * math.pi ** 2)) < 0.5,
   f"60万点で {_mc20:.3f} / 理論値 {28 * math.pi / 3 + 6 * math.pi ** 2:.3f}")

# ---- 九大理系2019 ----

# 第1問：∫[0,1](sin(2nπt) - xt - y)² dt の最小値
_ok19a = True
for _n in (1, 2, 3, 5):
    _A = -1 / (2 * _n * math.pi)
    _x, _y = 12 * _A, -6 * _A
    _J = quad(lambda t: (math.sin(2 * _n * math.pi * t) - _x * t - _y) ** 2, 0, 1, 400001)[0]
    if abs(_J - (0.5 - 3 / (_n * _n * math.pi ** 2))) > 1e-8:
        _ok19a = False
ok("九大理19-1 I_n = 1/2 - 3/(n²π²)、極限は 1/2", _ok19a,
   "n=1,2,3,5 で数値積分して確認（n=1 で 0.196036449）")
_ok19b = True
for _n in (1, 3):
    _A = -1 / (2 * _n * math.pi)
    _x0, _y0 = 12 * _A, -6 * _A
    _base = 0.5 - 3 / (_n * _n * math.pi ** 2)
    for _i in range(-3, 4):
        for _j in range(-3, 4):
            _v = quad(lambda t: (math.sin(2 * _n * math.pi * t) - (_x0 + _i / 50) * t - (_y0 + _j / 50)) ** 2,
                      0, 1, 20001)[0]
            if _v < _base - 1e-6:
                _ok19b = False
ok("九大理19-1 その (x,y) が本当に最小を与える", _ok19b, "近傍 7×7 通りで下回る点なし")

# 第2問：f(x²) = (x²+2)g(x) + 7、g(x³) = x⁴f(x) - 3x²g(x) - 6x² - 2
_f19 = lambda x: x * x + 3
_g19 = lambda x: x * x - 2
ok("九大理19-2 f(x)=x²+3, g(x)=x²-2",
   all(abs(_f19(_x * _x) - ((_x * _x + 2) * _g19(_x) + 7)) < 1e-9
       and abs(_g19(_x ** 3) - (_x ** 4 * _f19(_x) - 3 * _x * _x * _g19(_x) - 6 * _x * _x - 2)) < 1e-9
       for _x in (_i / 100 for _i in range(-500, 501))),
   "x を -5〜5 まで 0.01 刻みで両方の恒等式を確認")

# 第3問：サイコロ3回と ax²+bx+c = 0
_c1_19 = _c2_19 = _c3_19 = 0
for _a, _b, _c in itertools.product(range(1, 7), repeat=3):
    _D = _b * _b - 4 * _a * _c
    if _D == 0:
        _c1_19 += 1
    if _D < 0:
        _z = complex(-_b / (2 * _a), math.sqrt(-_D) / (2 * _a))
        if abs(abs(_z) - 1) < 1e-12:
            _c2_19 += 1
        _ang = abs(2 * math.degrees(cmath.phase(_z))) % 180
        if abs(min(_ang, 180 - _ang) - 60) < 1e-9:
            _c3_19 += 1
    else:
        _r1 = (-_b + math.sqrt(_D)) / (2 * _a)
        _r2 = (-_b - math.sqrt(_D)) / (2 * _a)
        if abs(abs(_r1) - 1) < 1e-12 and abs(abs(_r2) - 1) < 1e-12:
            _c2_19 += 1
ok("九大理19-3 重解 5/216、単位円周上 5/36、なす鋭角 60° が 7/108",
   Fraction(_c1_19, 216) == Fraction(5, 216)
   and Fraction(_c2_19, 216) == Fraction(5, 36)
   and Fraction(_c3_19, 216) == Fraction(7, 108),
   f"{_c1_19}/216, {_c2_19}/216, {_c3_19}/216")
_n1_19 = sum(1 for _a, _b, _c in itertools.product(range(1, 7), repeat=3) if _a * _c == _b * _b)
_n2_19 = sum(1 for _a, _b, _c in itertools.product(range(1, 7), repeat=3) if 3 * _a * _c == _b * _b)
ok("九大理19-3 内訳は ac=b² が 8 通り、3ac=b² が 6 通り",
   (_n1_19, _n2_19) == (8, 6) and _n1_19 + _n2_19 == _c3_19,
   f"{_n1_19} + {_n2_19} = {_n1_19 + _n2_19}")

# 第4問：正三角形 OAB での垂線の繰り返し
_A19 = (2.0, 0.0)
_B19 = (1.0, math.sqrt(3))
def _step19(P):
    _e = (0.5, math.sqrt(3) / 2)
    _d = P[0] * _e[0] + P[1] * _e[1]
    _R = (_d * _e[0], 0.0)
    _dd = (-0.5, math.sqrt(3) / 2)
    _s = (_R[0] - _A19[0]) * _dd[0] + (_R[1] - _A19[1]) * _dd[1]
    return (_A19[0] + _s * _dd[0], _A19[1] + _s * _dd[1])

_ok19d = True
for _t0 in (0.05, 0.5, 0.95):
    _P = (2 - _t0, math.sqrt(3) * _t0)
    for _ in range(60):
        _P = _step19(_P)
    if abs(_P[0] - 5 / 3) > 1e-9 or abs(_P[1] - math.sqrt(3) / 3) > 1e-9:
        _ok19d = False
ok("九大理19-4 極限の点は (5/3, √3/3)", _ok19d,
   "t₁ = 0.05, 0.5, 0.95 から 60 回くり返して確認")

# 第5問：w = (az+b)/(cz+1)
_w19 = lambda z: (z + 1) / (-z + 1)
_pts19 = [_w19(1j * _t / 100) for _t in range(-100000, 100001)]
ok("九大理19-5 a=1, b=1, c=-1、C は単位円から -1 を除いたもの",
   abs(_w19(1j) - 1j) < 1e-12 and abs(_w19(-1j) + 1j) < 1e-12
   and max(abs(abs(_p) - 1) for _p in _pts19) < 1e-9
   and min(abs(_p + 1) for _p in _pts19) > 1e-4,
   f"|w|-1 の最大 {max(abs(abs(_p) - 1) for _p in _pts19):.1e}、-1 への最接近 {min(abs(_p + 1) for _p in _pts19):.6f}")
_ok19e = True
for _th in (0.3, 1.0, 2.0):
    _cc = cmath.exp(1j * _th)
    _ww = lambda z: (z - _cc) / (_cc * z + 1)
    if max(abs(abs(_ww(1j * _t / 50)) - 1) for _t in range(-2000, 2001)) > 1e-9:
        _ok19e = False
    if abs(_ww(1j * math.tan(_th / 2)) + 1) > 1e-9:
        _ok19e = False
ok("九大理19-5 |c|=1 なら |w|=1、c≠-1 だと -1 が C に入ってしまう", _ok19e,
   "c = e^{0.3i}, e^{i}, e^{2i} で t = tan(θ/2) のとき w = -1")

# ---- 九大文系2025（第3問・第4問は理科系と共通なので省く） ----

# 第1問：y = x³+x²-x-1 と y = x² の共通接線
_fb25 = lambda x: x ** 3 + x * x - x - 1
_dfb25 = lambda x: 3 * x * x + 2 * x - 1
_hits25 = []
for _i in range(-400000, 400001):
    _t = _i / 100000
    _m = _dfb25(_t)
    _b = _fb25(_t) - _t * _m
    if abs(_b + _m * _m / 4) < 1e-9:
        if not _hits25 or abs(_t - _hits25[-1]) > 1e-3:
            _hits25.append(_t)
ok("九大文25-1 共通接線は y=0 と y=4x-4（t = ±1 のみ）",
   [round(_t, 6) for _t in _hits25] == [-1.0, 1.0]
   and abs(_dfb25(1) - 4) < 1e-12 and abs(_fb25(1) - 1 * _dfb25(1) + 4) < 1e-12
   and abs(_dfb25(-1)) < 1e-12 and abs(_fb25(-1)) < 1e-12,
   f"t = {[round(_t, 6) for _t in _hits25]}、9t²+4t+3 の判別式 {16 - 108}")

# 第2問：半径1の円周上で AB=√3 のときの AP²+BP² の最大
_A25b = (math.cos(math.pi / 3), math.sin(math.pi / 3))
_B25b = (math.cos(-math.pi / 3), math.sin(-math.pi / 3))
_mx25b = max((math.cos(2 * math.pi * _k / 200000) - _A25b[0]) ** 2
             + (math.sin(2 * math.pi * _k / 200000) - _A25b[1]) ** 2
             + (math.cos(2 * math.pi * _k / 200000) - _B25b[0]) ** 2
             + (math.sin(2 * math.pi * _k / 200000) - _B25b[1]) ** 2
             for _k in range(200001))
ok("九大文25-2 AP²+BP² の最大値は 6",
   abs(math.dist(_A25b, _B25b) - math.sqrt(3)) < 1e-12 and abs(_mx25b - 6) < 1e-9,
   f"AB={math.dist(_A25b, _B25b):.9f}、最大 {_mx25b:.9f}")

# ---- 九大文系2024（第3問・第4問は理科系と共通なので省く） ----

# 第1問：y=2x² と y=2x²-8x+16 の共通接線と、囲まれた面積
_hit24b = []
for _i in range(-400000, 400001):
    _s = _i / 100000
    _m, _b = 4 * _s, -2 * _s * _s
    if abs((8 + _m) ** 2 - 8 * (16 - _b)) < 1e-7:
        if not _hit24b or abs(_s - _hit24b[-1]) > 1e-3:
            _hit24b.append(_s)
_S24b = (quad(lambda x: 2 * x * x - (4 * x - 2), 1, 2, 200001)[0]
         + quad(lambda x: (2 * x * x - 8 * x + 16) - (4 * x - 2), 2, 3, 200001)[0])
ok("九大文24-1 共通接線は y=4x-2（s=1 のみ）、囲む面積は 4/3",
   [round(_s, 6) for _hit24b_s in [0] for _s in _hit24b] == [1.0]
   and abs(_S24b - 4 / 3) < 1e-9,
   f"s = {[round(_s, 6) for _s in _hit24b]}、面積 {_S24b:.9f} / 4/3 = {4 / 3:.9f}")

# 第2問：B の座標と s, t
_B24 = [(_p / 1000, 5 - 2 * (_p / 1000)) for _p in range(1, 10001)
        if abs((_p / 1000) ** 2 + (5 - 2 * (_p / 1000)) ** 2 - 10) < 1e-6 and 5 - 2 * (_p / 1000) > 0]
_B24u = []
for _pq in _B24:
    if not _B24u or abs(_pq[0] - _B24u[-1][0]) > 1e-2:
        _B24u.append(_pq)
_A24v, _B24v = (2.0, 1.0), (1.0, 3.0)
_cr24 = lambda u, v: u[0] * v[1] - u[1] * v[0]
_s24 = 0.8
_C24 = (_s24 * _A24v[0] + _s24 * _B24v[0], _s24 * _A24v[1] + _s24 * _B24v[1])
ok("九大文24-2 B(1,3)、s = t = 4/5",
   [(round(_p, 6), round(_q, 6)) for _p, _q in _B24u] == [(1.0, 3.0)]
   and abs(math.hypot(*_C24) - 4) < 1e-9
   and abs(abs(_cr24(_A24v, _C24)) - abs(_cr24(_B24v, _C24))) < 1e-12,
   f"B の候補 {[(round(_p, 3), round(_q, 3)) for _p, _q in _B24u]}、|OC|={math.hypot(*_C24):.9f}、"
   f"面積 {abs(_cr24(_A24v, _C24)) / 2:.9f} = {abs(_cr24(_B24v, _C24)) / 2:.9f}")

# ---- 九大文系2023 ----

# 第1問：y=|x²-9| と y=a で分かれる2つの面積
_a23 = 9 * (4 ** (1 / 3) - 1)
def _areas23(a):
    _p, _q = math.sqrt(9 - a), math.sqrt(9 + a)
    _S1 = quad(lambda x: (9 - x * x) - a, -_p, _p, 200001)[0]
    _S2 = 2 * (quad(lambda x: a - (9 - x * x), _p, 3, 200001)[0]
               + quad(lambda x: a - (x * x - 9), 3, _q, 200001)[0])
    return _S1, _S2

_s1_23, _s2_23 = _areas23(_a23)
ok("九大文23-1 S1 = S2 となるのは a = 9(∛4 - 1)",
   abs(_s1_23 - _s2_23) < 1e-6
   and abs((9 + _a23) ** 1.5 - 54) < 1e-9
   and _areas23(3.0)[0] > _areas23(3.0)[1] and _areas23(7.0)[0] < _areas23(7.0)[1],
   f"a={_a23:.9f}、S1={_s1_23:.7f}、S2={_s2_23:.7f}、q³={(9 + _a23) ** 1.5:.6f}")

# 第2問：y=x³-x の接線と y=-x の交点 B、外心 P
_cu23 = lambda x: x ** 3 - x
_ok23b = True
for _i in range(1, 4000):
    _t = _i / 500
    _m = 3 * _t * _t - 1
    _Bx = 2 * _t / 3
    if abs(-_Bx - (_m * (_Bx - _t) + _cu23(_t))) > 1e-9:
        _ok23b = False
        break
ok("九大文23-2 B = (2t/3, -2t/3)", _ok23b, "t を4000点で接線上にあることを確認")

def _sin2_23(t):
    _A = (t, _cu23(t))
    _B = (2 * t / 3, -2 * t / 3)
    _BO = (-_B[0], -_B[1])
    _BA = (_A[0] - _B[0], _A[1] - _B[1])
    _cr = _BO[0] * _BA[1] - _BO[1] * _BA[0]
    return _cr * _cr / ((_BO[0] ** 2 + _BO[1] ** 2) * (_BA[0] ** 2 + _BA[1] ** 2))

_f23 = lambda t: 9 * t ** 4 / (2 * (9 * t ** 4 - 6 * t * t + 2))
ok("九大文23-2 sin²θ = 9t⁴ / {2(9t⁴-6t²+2)}",
   all(abs(_sin2_23(_i / 500) - _f23(_i / 500)) < 1e-9 for _i in range(1, 4000)),
   "外積から直接計算した値と一致")

def _circum23(A, B):
    _d = 2 * (A[0] * B[1] - A[1] * B[0])
    _ux = ((A[0] ** 2 + A[1] ** 2) * B[1] - (B[0] ** 2 + B[1] ** 2) * A[1]) / _d
    _uy = ((B[0] ** 2 + B[1] ** 2) * A[0] - (A[0] ** 2 + A[1] ** 2) * B[0]) / _d
    return (_ux, _uy)

_best23 = (9e9, None)
for _i in range(1, 400000):
    _t = _i / 10000
    _A = (_t, _cu23(_t))
    _B = (2 * _t / 3, -2 * _t / 3)
    if abs(_A[0] * _B[1] - _A[1] * _B[0]) < 1e-12:
        continue
    _P = _circum23(_A, _B)
    _v = math.hypot(*_P) / math.hypot(*_A)
    if _v < _best23[0]:
        _best23 = (_v, _t)
ok("九大文23-2 f(t) の最小は t=√6/3 での 1/2",
   abs(_best23[0] - 0.5) < 1e-9 and abs(_best23[1] - math.sqrt(6) / 3) < 1e-3
   and abs(_sin2_23(math.sqrt(6) / 3) - 1) < 1e-12,
   f"最小 {_best23[0]:.9f} / t = {_best23[1]:.6f}（√6/3 = {math.sqrt(6) / 3:.6f}）")

# 第3問：r = q·v、s = q·w
random.seed(20230303 + 1)
_ok23r = True
for _ in range(20000):
    _a, _b, _c, _d = (random.uniform(-3, 3) for _ in range(4))
    _D = _a * _d - _b * _c
    if abs(_D) < 1e-3:
        continue
    _m, _n = (_a, _c), (_b, _d)
    _v = (_d / _D, -_b / _D)
    _w = (-_c / _D, _a / _D)
    _q = (random.uniform(-5, 5), random.uniform(-5, 5))
    _dot = lambda u, z: u[0] * z[0] + u[1] * z[1]
    _r, _s = _dot(_q, _v), _dot(_q, _w)
    if (abs(_r * _m[0] + _s * _n[0] - _q[0]) > 1e-6
            or abs(_r * _m[1] + _s * _n[1] - _q[1]) > 1e-6):
        _ok23r = False
        break
ok("九大文23-3 r = q·v、s = q·w で rm + sn = q", _ok23r, "2万組で確認")

# 第4問：1 の3乗根を並べる確率の列
def _nxt23(state, t):
    if state == 0:
        return 1 + (t % 3)
    _j = state - 1
    if t in (1, 2):
        return 0
    if t == 3:
        return 1 + ((_j + 1) % 3)
    if t == 4:
        return 1 + ((-(_j + 1)) % 3)
    if t == 5:
        return 1 + _j
    return 1 + ((-_j) % 3)

_P23 = {0: Fraction(1), 1: Fraction(0), 2: Fraction(0), 3: Fraction(0)}
_rows23 = []
for _n in range(1, 9):
    _rows23.append((_n, _P23[0], _P23[1], _P23[2], _P23[3]))
    _Q23 = {0: Fraction(0), 1: Fraction(0), 2: Fraction(0), 3: Fraction(0)}
    for _st, _pr in _P23.items():
        for _t in range(1, 7):
            _Q23[_nxt23(_st, _t)] += _pr * Fraction(1, 6)
    _P23 = _Q23
ok("九大文23-4 P(z_n=0) = 1/4 + (3/4)(-1/3)^{n-1}、P(z_n=1) = (1/4){1-(-1/3)^{n-1}}",
   all(_r[1] == Fraction(1, 4) + Fraction(3, 4) * Fraction(-1, 3) ** (_r[0] - 1)
       and _r[2] == Fraction(1, 4) * (1 - Fraction(-1, 3) ** (_r[0] - 1))
       and _r[2] == _r[3] == _r[4]
       for _r in _rows23),
   f"n=3 で P(0)={_rows23[2][1]}、P(1)=P(ω)=P(ω²)={_rows23[2][2]}")

# ---- 九大文系2022（第2問・第4問の大半は理科系と共通なので省く） ----

# 第1問：C: y=|(x+3)(x-a)| と ℓ: y=-x+13 が接する a と、面積
_D1_22 = lambda a: (a - 2) ** 2 + 4 * (3 * a - 13)
_hit22b = []
for _i in range(-29999, 130000):
    _a = _i / 10000
    if abs(_D1_22(_a)) < 1e-4:
        if not _hit22b or abs(_a - _hit22b[-1]) > 1e-2:
            _hit22b.append(_a)
_C22b = lambda x: abs(x * x - x - 12)
_L22b = lambda x: -x + 13
_S22b = (quad(lambda x: _L22b(x) - _C22b(x), 1, 4, 200001)[0]
         + quad(lambda x: _L22b(x) - _C22b(x), 4, 5, 200001)[0])
ok("九大文22-1 a=4、(4,0) を境界にもつ図形の面積は 41/3",
   [round(_a, 4) for _a in _hit22b] == [4.0]
   and all((_a + 4) ** 2 + 64 > 0 for _a in (-3, 0, 4, 12))
   and abs(_S22b - 41 / 3) < 1e-9,
   f"a = {[round(_a, 4) for _a in _hit22b]}、面積 {_S22b:.9f} / 41/3 = {41 / 3:.9f}")

# 第2問：PQ の長さ（n と P' は理科系2022第1問で確認済み）
_A22b, _B22b, _P22b = (1, 1, 0), (2, 1, 2), (4, 0, -1)
_cr22b = (_A22b[1] * _B22b[2] - _A22b[2] * _B22b[1],
          _A22b[2] * _B22b[0] - _A22b[0] * _B22b[2],
          _A22b[0] * _B22b[1] - _A22b[1] * _B22b[0])
_n22b = tuple(_c / 3 for _c in _cr22b)
_d22b = sum(_P22b[_k] * _n22b[_k] for _k in range(3))
_Q22b = tuple(_P22b[_k] - _d22b * _n22b[_k] for _k in range(3))
ok("九大文22-2 PQ = 3、Q = (2,2,0)",
   abs(_d22b - 3) < 1e-12
   and all(abs(_Q22b[_k] - (2, 2, 0)[_k]) < 1e-12 for _k in range(3))
   and abs(sum(_Q22b[_k] * _n22b[_k] for _k in range(3))) < 1e-12,
   f"OP·n = {_d22b:.6f}、Q = {tuple(round(_v, 6) for _v in _Q22b)}")

# 第3問：f(x) = x⁴+6x³-kx²+2kx-64
_f22b = lambda x, k: x ** 4 + 6 * x ** 3 - k * x * x + 2 * k * x - 64
_sol22b = []
for _m in range(1, 33):
    if 32 % _m or (_m - 8) % 2:
        continue
    _p = (_m - 8) // 2
    _rest = 32 // _m - _p * _p
    if _rest > 0 and math.isqrt(_rest) ** 2 == _rest:
        _q = math.isqrt(_rest)
        _sol22b.append((_m, _p, _q, 16 - (_p * _p + _q * _q + 2 * _p * (-_m))))
ok("九大文22-3 k = -8, 12",
   all(abs(_f22b(2, _k)) < 1e-9 for _k in (-5, 0, 7, 13))
   and sorted(_s[3] for _s in _sol22b) == [-8, 12]
   and all(abs(_f22b(_z, -8)) < 1e-9
           for _z in (2, -4, complex(-2, 2), complex(-2, -2)))
   and all(abs(_f22b(_z, 12)) < 1e-9
           for _z in (2, -8, complex(0, 2), complex(0, -2))),
   f"(m,p,q,k) = {_sol22b}")

# 第4問：整式の増加関数に対する区分求積（理科系と同じ評価式を整式で確認）
_ok22b4 = True
for _f in (lambda x: x ** 3 + x, lambda x: x ** 5 + 2 * x):
    _I = quad(_f, 0, 1, 200001)[0]
    for _n in (10, 100, 1000):
        _S = sum(_f((_i - 1) / _n) for _i in range(1, _n + 1)) / _n
        if not (-1e-9 <= _I - _S <= (_f(1) - _f(0)) / _n + 1e-9):
            _ok22b4 = False
ok("九大文22-4 整式の増加関数でも 0 ≦ ∫f - S_n ≦ (f(1)-f(0))/n", _ok22b4,
   "x³+x と x⁵+2x × n=10,100,1000 で確認")

# ---- 九大文系2021 ----

# 第1問：三角形 OAB の内接円と、両軸に接する円が AB から切り取る弦
_r21 = (3 - math.sqrt(5)) / 2
_d21 = lambda R: abs(3 * R - 2) / math.sqrt(5)
ok("九大文21-1 内心は ((3-√5)/2, (3-√5)/2)",
   abs(_d21(_r21) - _r21) < 1e-12,
   f"r = {_r21:.9f}、AB までの距離 {_d21(_r21):.9f}")
_mx21b = max((2 * math.sqrt(_R * _R - _d21(_R) ** 2), _R)
             for _R in (_i / 100000 * 3 for _i in range(1, 100001))
             if _d21(_R) < _R)
ok("九大文21-1 PQ の最大値は 2（半径 3/2）",
   abs(_mx21b[0] - 2) < 1e-7 and abs(_mx21b[1] - 1.5) < 1e-4,
   f"r = {_mx21b[1]:.5f} で PQ = {_mx21b[0]:.9f}")

# 第2問：すべての t（または |t|≦1）で y ≧ xt - 2t²
_ok21a = _ok21b = True
for _i in range(-200, 201):
    _x = _i / 20
    _m1 = max(_x * (_t / 1000) - 2 * (_t / 1000) ** 2 for _t in range(-20000, 20001))
    _m2 = max(_x * (_t / 100000) - 2 * (_t / 100000) ** 2 for _t in range(-100000, 100001))
    if abs(_m1 - _x * _x / 8) > 1e-5:
        _ok21a = False
    _pred = _x * _x / 8 if abs(_x) <= 4 else abs(_x) - 2
    if abs(_m2 - _pred) > 1e-5:
        _ok21b = False
ok("九大文21-2 条件 A は y ≧ x²/8、条件 B は |x|≦4 で x²/8、|x|>4 で |x|-2",
   _ok21a and _ok21b, "x を -10〜10 まで 0.05 刻みで最大を数値計算して確認")

# 第3問：C: y = -x²-2ax-a³+10a と ℓ: y = 8x+6
_D21c = lambda a: (2 * a + 8) ** 2 - 4 * (a ** 3 - 10 * a + 6)
_hit21c = []
for _i in range(1, 200000):
    _a = _i / 10000
    if abs(_D21c(_a)) < 1e-3:
        if not _hit21c or abs(_a - _hit21c[-1]) > 1e-2:
            _hit21c.append(_a)
_C21c = lambda x: -x * x - 10 * x - 75
_L21c = lambda x: 8 * x + 6
_S21c = quad(lambda x: _L21c(x) - _C21c(x), -9, 0, 200001)[0]
ok("九大文21-3 a=5、囲む面積は 243",
   [round(_a, 4) for _a in _hit21c] == [5.0]
   and abs(_C21c(-9) - _L21c(-9)) < 1e-12
   and abs(_S21c - 243) < 1e-6
   and -2 + math.sqrt(2) < 0,
   f"a = {[round(_a, 4) for _a in _hit21c]}、接点 (-9,{_C21c(-9):.0f})、面積 {_S21c:.6f}")

# 第4問：Σ k2^{k-1} と、和の形の漸化式
ok("九大文21-4 Σ[k=1..n] k·2^{k-1} = (n-1)2^n + 1",
   all(sum(_k * 2 ** (_k - 1) for _k in range(1, _n + 1)) == (_n - 1) * 2 ** _n + 1
       for _n in range(1, 15)),
   "n = 1〜14 で確認")
_a21 = [None, Fraction(2)]
for _n in range(1, 13):
    _a21.append(1 + Fraction(1, 2) * sum((_n + 1 - _k) * _a21[_k] for _k in range(1, _n + 1)))
ok("九大文21-4 a_1 = 2、n ≧ 2 で a_n = 2^{n-1}",
   _a21[1] == 2 and all(_a21[_n] == 2 ** (_n - 1) for _n in range(2, 14)),
   "a_1〜a_13 = " + ", ".join(str(_a21[_n]) for _n in range(1, 8)) + ", ...")

# ---- 九大文系2020（第4問は理科系と共通なので省く） ----

# 第1問：C1: y=x² と C2: y=3(x-a)²+a³-40
_D20b = lambda a: -2 * a ** 3 + 3 * a * a + 80
_S20b = lambda a: _D20b(a) ** 1.5 / 3
_mx20b = max((_S20b(_i / 100000 * 4), _i / 100000 * 4) for _i in range(0, 100000))
ok("九大文20-1 0 ≦ a < 4、S の最大は a=1 での 243",
   abs(_D20b(4)) < 1e-12
   and all(_D20b(_a / 1000) > 0 for _a in range(0, 4000))
   and 25 - 160 < 0
   and abs(_mx20b[0] - 243) < 1e-6 and abs(_mx20b[1] - 1) < 1e-4,
   f"a = {_mx20b[1]:.5f} で S = {_mx20b[0]:.6f}")
_r20b = ((3 - math.sqrt(_D20b(1))) / 2, (3 + math.sqrt(_D20b(1))) / 2)
_A20b = quad(lambda x: x * x - (3 * (x - 1) ** 2 + 1 - 40), _r20b[0], _r20b[1], 200001)[0]
ok("九大文20-1 a=1 のとき交点は x=-3,6、面積は 243",
   abs(_r20b[0] + 3) < 1e-12 and abs(_r20b[1] - 6) < 1e-12 and abs(_A20b - 243) < 1e-6,
   f"交点 {tuple(round(_v, 6) for _v in _r20b)}、面積 {_A20b:.6f}")

# 第2問：正四面体と z 軸に垂直な断面
_O20b = (0.0, 0.0, 0.0)
_A20v = (1.0, 1.0, 0.0)
_B20v = (1.0, 0.0, 1.0)
_C20v = (0.0, 1.0, 1.0)
ok("九大文20-2 p=1, q=0, r=1, s=1（6辺がすべて √2）",
   all(abs(math.dist(_P, _Q) - math.sqrt(2)) < 1e-12
       for _P, _Q in itertools.combinations((_O20b, _A20v, _B20v, _C20v), 2)),
   "4点の6辺をすべて計算して確認")

_ok20b2 = True
for _t in (0.25, 0.5, 0.75):
    _P1 = tuple(_t * _B20v[_k] for _k in range(3))
    _P2 = tuple(_t * _C20v[_k] for _k in range(3))
    _P3 = tuple(_A20v[_k] + _t * (_C20v[_k] - _A20v[_k]) for _k in range(3))
    _v1 = tuple(_P2[_k] - _P1[_k] for _k in range(3))
    _v2 = tuple(_P3[_k] - _P2[_k] for _k in range(3))
    if (abs(sum(_v1[_k] * _v2[_k] for _k in range(3))) > 1e-12
            or abs(math.dist(_P1, _P2) * math.dist(_P2, _P3) - 2 * _t * (1 - _t)) > 1e-12):
        _ok20b2 = False
ok("九大文20-2 断面は長方形で面積 2t(1-t)、最大は t=1/2 の 1/2", _ok20b2,
   "t = 0.25, 0.5, 0.75 で内積 0・面積一致を確認")

# 第3問：f(x) = x³+ax²+bx+c、f((1+√3i)/2)=0
_w20b = complex(0.5, math.sqrt(3) / 2)
_f20b = lambda x, c: x ** 3 + (c - 1) * x * x + (1 - c) * x + c
_c20b = [_c for _c in range(-40, 41) if (1 + _c) % 7 == 4 and (3 * _c - 3) % 11 == 2]
ok("九大文20-3 a=c-1, b=1-c、c=31、解は (1±√3i)/2 と -31",
   all(abs(_f20b(_w20b, _c)) < 1e-9 for _c in (-5, 0, 7, 31))
   and _c20b == [31]
   and abs(_f20b(-31, 31)) < 1e-9
   and _f20b(1, 31) == 32 and _f20b(-1, 31) == 90,
   f"c の候補 {_c20b}、f(1)={_f20b(1, 31)}、f(-1)={_f20b(-1, 31)}")

# ---- 九大文系2019（第4問は理科系2019第2問と共通なので省く） ----

# 第1問：3 と 8 の硬貨を10回投げて積が8桁
_cnt19 = sum(math.comb(10, _k) for _k in range(11) if len(str(3 ** _k * 8 ** (10 - _k))) == 8)
_dig19 = [_k for _k in range(11) if len(str(3 ** _k * 8 ** (10 - _k))) == 8]
ok("九大文19-1 積が8桁になる確率は 165/512（表が3回か4回）",
   _dig19 == [3, 4] and Fraction(_cnt19, 1024) == Fraction(165, 512),
   f"8桁になるのは k={_dig19}、{_cnt19}/1024")

# 第2問：y = x³-kx²+kx+1 の極大値 - 極小値
def _dif19(k):
    _D = k * k - 3 * k
    if _D <= 0:
        return None
    _a = (2 * k - 2 * math.sqrt(_D)) / 6
    _b = (2 * k + 2 * math.sqrt(_D)) / 6
    _f = lambda x: x ** 3 - k * x * x + k * x + 1
    return _f(_a) - _f(_b)

ok("九大文19-2 極大値-極小値 = (4/27)(k²-3k)^{3/2}",
   all(abs(_dif19(_k) - 4 / 27 * (_k * _k - 3 * _k) ** 1.5) < 1e-9
       for _k in (-3 / 8, -1, -2.5, 4, 5)),
   "k = -3/8, -1, -2.5, 4, 5 で確認")
_hit19 = []
for _i in range(-200000, 500000):
    _k = _i / 100000
    if _k * _k - 3 * _k <= 1e-9:
        continue
    if abs(4 / 27 * (_k * _k - 3 * _k) ** 1.5 - 4 * abs(_k) ** 3) < 1e-6:
        if not _hit19 or abs(_k - _hit19[-1]) > 1e-3:
            _hit19.append(_k)
ok("九大文19-2 k = -3/8",
   any(abs(_k + 0.375) < 1e-4 for _k in _hit19)
   and all(abs(_k + 0.375) < 1e-4 or abs(_k) < 1e-3 for _k in _hit19),
   f"候補 {[round(_k, 6) for _k in _hit19]}（k→0 の側は極値が消えるので不適）")

# 第3問：平面 α と四面体 ABCP
_A19b, _B19b, _C19b = (1, 2, 3), (3, 2, 3), (4, 5, 6)
_ab19 = tuple(_B19b[_i] - _A19b[_i] for _i in range(3))
_ac19 = tuple(_C19b[_i] - _A19b[_i] for _i in range(3))
_cr19 = (_ab19[1] * _ac19[2] - _ab19[2] * _ac19[1],
         _ab19[2] * _ac19[0] - _ab19[0] * _ac19[2],
         _ab19[0] * _ac19[1] - _ab19[1] * _ac19[0])
_nrm19 = math.sqrt(sum(_c * _c for _c in _cr19))
ok("九大文19-3 法線は (0,-6,6)、△ABC = 3√2、PH = |q-p-1|/√2",
   _cr19 == (0, -6, 6) and abs(_nrm19 / 2 - 3 * math.sqrt(2)) < 1e-12
   and all(abs(abs(_q - _p - 1) / math.sqrt(2)
                - abs(sum(_cr19[_i] * ((6, _p, _q)[_i] - _A19b[_i]) for _i in range(3))) / _nrm19) < 1e-12
           for _p, _q in ((9, 7), (10, 7), (9, 8))),
   f"外積 {_cr19}、面積 {_nrm19 / 2:.9f}")
_v19 = [abs((7 + math.sin(_t / 10000)) - (9 + math.cos(_t / 10000)) - 1) for _t in range(0, 62832)]
ok("九大文19-3 体積の最大 3+√2、最小 3-√2",
   abs(min(_v19) - (3 - math.sqrt(2))) < 1e-7 and abs(max(_v19) - (3 + math.sqrt(2))) < 1e-7,
   f"最小 {min(_v19):.9f}、最大 {max(_v19):.9f}")

# ---- 名大理系2024 ----

# 第1問：f(x) = √x + 2/√x への接線
_f24n = lambda x: math.sqrt(x) + 2 / math.sqrt(x)
_df24n = lambda x: (x - 2) / (2 * x ** 1.5)
ok("名理24-1 極小は x=2 の 2√2",
   abs(_df24n(2)) < 1e-15 and abs(_f24n(2) - 2 * math.sqrt(2)) < 1e-12
   and _df24n(1) < 0 and _df24n(3) > 0,
   f"f(2) = {_f24n(2):.10f} / 2√2 = {2 * math.sqrt(2):.10f}")

def _roots24n(t):
    _D = (6 + t) ** 2 + 8 * t
    if _D < 0:
        return []
    return sorted({round(x, 9) for x in ((-(6 + t) + _s * math.sqrt(_D)) / 2 for _s in (1, -1))
                   if x > 1e-9})

ok("名理24-1 接線がちょうど2本なのは t < -18",
   all(len(_roots24n(_t)) == 2 for _t in (-18.0001, -19, -20, -27, -50, -1000))
   and all(len(_roots24n(_t)) != 2 for _t in (5, 1, 0, -1, -6, -10, -18))
   and len(_roots24n(-18)) == 1,
   "判別式 t²+20t+36 = (t+2)(t+18)、t=-18 では重解 a=6")

_int24n = []
for _al in range(3, 7):
    _t = -_al * (_al + 6) / (_al - 2)
    _rs = _roots24n(_t)
    if len(_rs) == 2 and all(abs(_r - round(_r)) < 1e-9 for _r in _rs):
        _int24n.append((int(round(_rs[0])), int(round(_rs[1]))))
ok("名理24-1 (α,β) = (3,18), (4,10)", _int24n == [(3, 18), (4, 10)],
   f"α=3〜6 を試して {_int24n}（(α-2)(β-2)=16）")

# 第2問：P(z) と Q(z)
_al24 = (1 - 1j) / math.sqrt(2)
_P24 = lambda z, c: z ** 3 - 3 * z * z + (c + 2) * z - c
_Q24 = lambda z, c: -_al24 ** 7 * z ** 3 + 3 * _al24 ** 6 * z * z + (c + 2) * _al24 * z - c
ok("名理24-2 α⁸=1 で Q(z) = P(αz)",
   abs(_al24 ** 8 - 1) < 1e-12
   and all(abs(_Q24(_z, _c) - _P24(_al24 * _z, _c)) < 1e-9
           for _c in (2.0, 3.5, 4 - 2 * math.sqrt(2))
           for _z in (complex(0.3, 0.7), complex(-1, 2), complex(2, -0.5))),
   "3つの c と3つの z で確認")

_c24 = 4 - 2 * math.sqrt(2)
_k24 = math.sqrt(_c24 - 1)
_qs24 = [(1 + 0j) / _al24, (1 + 1j * _k24) / _al24, (1 - 1j * _k24) / _al24]
_be24 = complex(1, math.sqrt(2) - 1)
ok("名理24-2 Q の実部最大は (1+√(c-1))/√2、共通解は c=4-2√2 で β=1+(√2-1)i",
   abs(max(_z.real for _z in _qs24) - (1 + _k24) / math.sqrt(2)) < 1e-12
   and abs(_P24(_be24, _c24)) < 1e-12 and abs(_Q24(_be24, _c24)) < 1e-12
   and abs(_k24 - (math.sqrt(2) - 1)) < 1e-12,
   f"c = {_c24:.9f}、β = 1+{math.sqrt(2) - 1:.9f}i、|P(β)|={abs(_P24(_be24, _c24)):.1e}")

# 第3問：平面 H と領域 K
_A24n, _B24n, _C24n = (3, 1, 3), (4, 2, 2), (4, 0, 1)
_AB24 = tuple(_B24n[_i] - _A24n[_i] for _i in range(3))
_AC24 = tuple(_C24n[_i] - _A24n[_i] for _i in range(3))
_dt24 = lambda u, v: sum(u[_i] * v[_i] for _i in range(3))
_Q24p = tuple(_A24n[_i] - _AB24[_i] + _AC24[_i] for _i in range(3))
ok("名理24-3 内積は 3, 6, 2、AQ = -AB + AC",
   (_dt24(_AB24, _AB24), _dt24(_AC24, _AC24), _dt24(_AB24, _AC24)) == (3, 6, 2)
   and abs(_dt24(_Q24p, _AB24)) < 1e-12 and abs(_dt24(_Q24p, _AC24)) < 1e-12,
   f"Q = {_Q24p}")

_ok24r = True
for _s, _t in ((0, 0), (1, 0), (0, 3), (2, 5), (0.5, 0.2)):
    _u = 1 / (1 + _s)
    _r = (_s + _t) / (1 + _s)
    _P = tuple(_A24n[_k] + _s * _AB24[_k] + _t * _AC24[_k] for _k in range(3))
    _X = tuple((1 - _u) * _Q24p[_k] + _u * _P[_k] for _k in range(3))
    _R = tuple(_A24n[_k] + _r * _AC24[_k] for _k in range(3))
    if any(abs(_X[_k] - _R[_k]) > 1e-9 for _k in range(3)) or _dt24(_R, _R) > _dt24(_P, _P) + 1e-9:
        _ok24r = False
ok("名理24-3 線分 QP 上に AR = rAC（r≧0）の点がある", _ok24r,
   "u = 1/(1+s)、r = (s+t)/(1+s) で5通り確認")

_S24n = tuple(_A24n[_k] + (2 / 3) * _AC24[_k] for _k in range(3))
_best24 = (9e9, None)
for _i in range(0, 801):
    for _j in range(0, 801):
        _s, _t = _i / 100, _j / 100
        _P = tuple(_A24n[_k] + _s * _AB24[_k] + _t * _AC24[_k] for _k in range(3))
        _v = _dt24(_P, _P)
        if _v < _best24[0]:
            _best24 = (_v, (_s, _t))
ok("名理24-3 最短の点は S(11/3, 1/3, 5/3)、|OS|² = 49/3",
   abs(_dt24(_S24n, _S24n) - 49 / 3) < 1e-9
   and abs(_best24[0] - 49 / 3) < 1e-4 and _best24[1][0] == 0,
   f"格子探索 {_best24[0]:.6f}（s,t）={_best24[1]} / 49/3 = {49 / 3:.6f}")

# 第4問：f(k) の積分表示と I
_fk24 = lambda n, k, p: sum(math.comb(n, _j) * p ** _j * (1 - p) ** (n - _j) for _j in range(k, n + 1))
_ok24i = True
for _n in (3, 5, 7):
    for _k in range(1, _n + 1):
        for _p in (0.2, 0.5, 0.73):
            _lhs = _fk24(_n, _k, _p)
            _rhs = (math.factorial(_n) / (math.factorial(_k - 1) * math.factorial(_n - _k))
                    * quad(lambda x: x ** (_k - 1) * (1 - x) ** (_n - _k), 0, _p, 20001)[0])
            if abs(_lhs - _rhs) > 1e-7:
                _ok24i = False
ok("名理24-4 f(k) = n!/{(k-1)!(n-k)!} ∫[0,p] x^{k-1}(1-x)^{n-k} dx", _ok24i,
   "n=3,5,7 × k=1..n × p=0.2,0.5,0.73 で確認")

ok("名理24-4 ∫[0,1/2] x^k(1-x)^k dx = (k!)²/{2(2k+1)!}",
   all(abs(quad(lambda x: x ** _k * (1 - x) ** _k, 0, 0.5, 200001)[0]
           - math.factorial(_k) ** 2 / (2 * math.factorial(2 * _k + 1))) < 1e-12
       for _k in (1, 2, 3, 4)),
   "k=1,2,3,4 で小数12桁まで一致")

# ---- 名大理系2023 ----

# 第1問：|α-1|=1 上の共役な解をもつ4次方程式
random.seed(20230001)
_ok23a = True
for _ in range(20000):
    _th = random.uniform(0.01, 2 * math.pi - 0.01)
    _ph = random.uniform(0.01, 2 * math.pi - 0.01)
    _al = 1 + cmath.exp(1j * _th)
    _be = 1 + cmath.exp(1j * _ph)
    if abs(_al.imag) < 1e-6 or abs(_be.imag) < 1e-6:
        continue
    if abs(_al + _al.conjugate() - _al * _al.conjugate()) > 1e-9:
        _ok23a = False
        break
    _t = (_al + _al.conjugate()).real
    _u = (_be + _be.conjugate()).real
    _p, _q, _r, _sv = _t + _u, _t + _u + _t * _u, 2 * _t * _u, _t * _u
    if any(abs((_x * _x - _t * _x + _t) * (_x * _x - _u * _x + _u)
               - (_x ** 4 - _p * _x ** 3 + _q * _x * _x - _r * _x + _sv)) > 1e-6
           for _x in (0.3, 1.7, -2.1)):
        _ok23a = False
        break
ok("名理23-1 α+ᾱ=αᾱ、p=t+u, q=t+u+tu, r=2tu, s=tu", _ok23a, "円周上の点を2万組とって確認")

random.seed(20230002)
_ok23b = True
for _ in range(200000):
    _p = random.uniform(-1, 10)
    _sv = random.uniform(-1, 30)
    _D = _p * _p - 4 * _sv
    _real = False
    if _D > 0:
        _t1 = (_p - math.sqrt(_D)) / 2
        _t2 = (_p + math.sqrt(_D)) / 2
        _real = 0 < _t1 < 4 and 0 < _t2 < 4
    _pred = (0 < _p < 8) and (_sv > 0) and (_sv > 4 * _p - 16) and (_sv < _p * _p / 4)
    if _real != _pred:
        _ok23b = False
        break
ok("名理23-1 (p,s) の範囲は 0<p<8, 0<s, 4p-16<s, s<p²/4", _ok23b, "20万組で判定が完全一致")

# 第2問：2円の交わりと回転体
_ok23v = True
_ok23m = True
for _a23, _b23 in ((3.0, 1.2), (5.0, 2.0), (2.0, 0.5)):
    _h23 = lambda r, a=_a23, b=_b23: (a * a - b * b + r * r) / (2 * a)
    def _Vd(r, a=_a23, b=_b23):
        _hh = _h23(r, a, b)
        _k2 = r * r - _hh * _hh
        return (math.pi * _k2 * (_hh - a + b) / 3
                + math.pi * (2 * r ** 3 / 3 - r * r * _hh + _hh ** 3 / 3))
    _Vf = lambda r, a=_a23, b=_b23: (math.pi / 3 * (r - _h23(r, a, b))
                                     * (2 * r * r - (a - b) * (r + _h23(r, a, b))))
    for _i in range(1, 6):
        _r = _a23 - _b23 + 2 * _b23 * _i / 6
        if abs(_Vd(_r) - _Vf(_r)) > 1e-9:
            _ok23v = False
    _bm = max((_Vf(_a23 - _b23 + 2 * _b23 * _i / 200000), _a23 - _b23 + 2 * _b23 * _i / 200000)
              for _i in range(1, 200000))
    _rA = (3 * _a23 ** 2 + 2 * _a23 * _b23 + _b23 ** 2) / (3 * _a23 + _b23)
    if abs(_bm[1] - _rA) > 1e-4:
        _ok23m = False
ok("名理23-2 V(r) = (π/3)(r-h){2r² - (a-b)(r+h)}", _ok23v,
   "(a,b)=(3,1.2),(5,2),(2,0.5) × 5点で円錐＋球欠と一致")
ok("名理23-2 最大を与える r は (3a²+2ab+b²)/(3a+b)、lim(r(a)-a) = b/3",
   _ok23m and all(abs((3 * _A ** 2 + 2 * _A * 1.2 + 1.44) / (3 * _A + 1.2) - _A - 0.4) < 0.04
                  for _A in (100, 1000, 100000)),
   "b=1.2 で a=100,1000,100000 のとき r(a)-a → 0.4 = b/3")

# 第3問：e^x との共有点
_phi23 = lambda x: 2 * x ** 3 / (x - 1)
_r1_23 = [_x / 100000 for _x in range(-1000000, 0)
          if (_phi23(_x / 100000) - math.exp(_x / 100000))
          * (_phi23((_x + 1) / 100000) - math.exp((_x + 1) / 100000)) < 0]
_psi23 = lambda x: x ** 3 - 3 * x - math.exp(x)
_r2_23 = [_x / 100000 for _x in range(-1000000, 0)
          if _psi23(_x / 100000) * _psi23((_x + 1) / 100000) < 0]
ok("名理23-3 (1) は1個、(2) は2個",
   len(_r1_23) == 1 and len(_r2_23) == 2,
   f"(1) {[round(_v, 5) for _v in _r1_23]}、(2) {[round(_v, 5) for _v in _r2_23]}")

_G23 = lambda x: x * x - math.exp(x) / x
_min23 = min((_G23(_x / 200000), _x / 200000) for _x in range(-2000000, -1))
ok("名理23-3 G(x)=x²-e^x/x は両端で +∞、極小は1つでそこが最小",
   abs(_min23[0] - 1.192251753) < 1e-6 and abs(_min23[1] + 0.745385) < 1e-4
   and _G23(-1e-5) > 1e4 and _G23(-10) > 50
   and abs(_min23[1] - _r1_23[0]) < 1e-3,
   f"最小 {_min23[0]:.9f}（x={_min23[1]:.6f}、(1) の解と一致）")

# 第4問：P_n(x) = x(x+1)...(x+n-1) の係数
def _Bco23(n):
    _poly = [1]
    for _i in range(n):
        _new = [0] * (len(_poly) + 1)
        for _d, _c in enumerate(_poly):
            _new[_d + 1] += _c
            _new[_d] += _c * _i
        _poly = _new
    return _poly

ok("名理23-4 Σ[m=1..n] nB_m = n!",
   all(sum(_Bco23(_n)[1:]) == math.factorial(_n) for _n in range(1, 10)),
   "n=1〜9 で確認")
_ok23s = True
for _n in range(1, 9):
    _B = _Bco23(_n)
    _B1 = _Bco23(_n + 1)
    for _k in range(1, _n + 1):
        if sum(_B[_j] * math.comb(_j, _k) for _j in range(_k, _n + 1)) != _B1[_k + 1]:
            _ok23s = False
ok("名理23-4 Σ[j=k..n] nB_j·jC_k = (n+1)B_{k+1}", _ok23s,
   "1≦n≦8、1≦k≦n のすべてで整数のまま一致")

# ---- 名大理系2022 ----

# 第1問：x³ を (x-a)² / (x²+αx+β) で割った余り
ok("名理22-1 x³ を (x-a)² で割った余りは 3a²x-2a³（商は x+2a）",
   all(abs((_x ** 3 - (3 * _a * _a * _x - 2 * _a ** 3)) / ((_x - _a) ** 2) - (_x + 2 * _a)) < 1e-9
       for _a in (0.7, -1.3, 2.0, 0.0) for _x in (0.3, 1.1, -2.0, 5.0) if abs(_x - _a) > 1e-6),
   "a 4通り × x 4通りで確認")

def _nroot22(b):
    # α³-3α-b=0 の実数解の個数（判別式 Δ = 108-27b²）
    _D = 108 - 27 * b * b
    return 3 if _D > 1e-12 else (2 if abs(_D) <= 1e-12 else 1)

ok("名理22-1 f(x) の個数は |b|<2 で3個、|b|=2 で2個、|b|>2 で1個",
   all(_nroot22(_b) == (1 if abs(_b) > 2 else (2 if abs(_b) == 2 else 3))
       for _b in (-5, -2.5, -2, -1, 0, 1, 1.9999, 2, 2.0001, 2.5, 5)),
   "判別式 108-27b² の符号で数えて予想と一致")

# 第2問：サイコロ3回
_c1_22n = _c2_22n = 0
for _a, _b, _c in itertools.product(range(1, 7), repeat=3):
    if _a * _b + 2 * _c >= _a * _b * _c:
        _c1_22n += 1
    if math.gcd(_a * _b + 2 * _c, 2 * _a * _b * _c) == 1:
        _c2_22n += 1
ok("名理22-2 ab+2c ≧ abc が 29/108、ab+2c と 2abc が互いに素が 13/72",
   Fraction(_c1_22n, 216) == Fraction(29, 108) and Fraction(_c2_22n, 216) == Fraction(13, 72),
   f"{_c1_22n}/216, {_c2_22n}/216")

# 第3問：正六角形と複素数
_w22 = 1 + math.sqrt(3) * 1j
def _hex22(p):
    _s3 = math.sqrt(3)
    return {"O": 0 * p, "A": p, "B": p * (3 + _s3 * 1j) / 2, "C": p * (1 + _s3 * 1j),
            "D": p * _s3 * 1j, "E": p * (-1 + _s3 * 1j) / 2}

_pv22 = complex(0.7, -0.4)
_ord22 = [_hex22(_pv22)[_k] for _k in ("O", "A", "B", "C", "D", "E")]
ok("名理22-3 β/α = 1+√3i（|w|=2、arg=60°）、頂点の並びは正六角形",
   abs(4 - 2 * _w22 + _w22 * _w22) < 1e-12
   and abs(abs(_w22) - 2) < 1e-12
   and abs(math.degrees(cmath.phase(_w22)) - 60) < 1e-9
   and max(abs(abs(_ord22[(_i + 1) % 6] - _ord22[_i]) - abs(_pv22)) for _i in range(6)) < 1e-12,
   "6辺がすべて |p| に等しい")

_ok22h = True
_got22 = []
for _name, _pp in (("B", (1 - math.sqrt(3) * 1j) / 2),
                   ("D", (-1 - math.sqrt(3) * 1j) / 4),
                   ("E", (-3 - math.sqrt(3) * 1j) / 6)):
    _al = _pp
    _be = _al * (1 + math.sqrt(3) * 1j)
    _ga = _al + 1
    _V = _hex22(_al)
    _eq3 = 2 * _ga ** 2 - (3 * _al + _be + 2) * _ga + (_al + 1) * (_al + _be)
    _hit = [_k for _k, _v in _V.items() if abs(_v - _ga) < 1e-9]
    _got22.append((_name, _hit))
    if (abs(_eq3) > 1e-12 or _hit != [_name]
            or abs(_V["A"] - _al) > 1e-12 or abs(_V["C"] - _be) > 1e-12):
        _ok22h = False
ok("名理22-3 γ = α+1 が B, D, E になる3組（α は A、β は C）", _ok22h,
   f"γ の頂点 {[_g[1] for _g in _got22]}、第3式はいずれも 0")

# 第4問：増加関数と a_n < 4
_ok22f = True
_a22list = []
for _f22, _nm in ((lambda x: 1 + x, "1+x"), (lambda x: math.exp(x), "e^x"),
                  (lambda x: 1 + math.sqrt(x), "1+√x")):
    for _n in (2, 5, 20, 100):
        _I = quad(lambda x: _f22(x) / (2 - x), 0, 2 - 1 / _n, 100001)[0]
        _Fn = lambda y: quad(lambda x: _f22(x) / (x - 2), 2 + 1 / _n, y, 100001)[0]
        if not (_Fn(4.0) > _I):
            _ok22f = False
        _lo, _hi = 2 + 1 / _n + 1e-9, 4.0
        for _ in range(50):
            _mid = (_lo + _hi) / 2
            if _Fn(_mid) < _I:
                _lo = _mid
            else:
                _hi = _mid
        _a22list.append((_lo + _hi) / 2)
        if (_lo + _hi) / 2 >= 4:
            _ok22f = False
ok("名理22-4 F_n(4) > I_n（x↦4-x の置換）なので a_n < 4", _ok22f,
   f"3つの f × n=2,5,20,100 で a_n は {min(_a22list):.3f}〜{max(_a22list):.3f}")

# ---- 名古屋大学 理科系 2021 ----

_A21 = 0.5
_D21 = math.sqrt(_A21**2 - 2 * _A21**4)
_T1_21 = _A21 - _D21
_S21 = quad(lambda x: x * x - (2 * _T1_21 * x - _T1_21**2), _T1_21, _A21, 20001)[0]
ok(
    "名理21-1 2接線は t²-2at+2a⁴=0 で決まり、交点は (a, 2a⁴)、S(a) = a³(1-2a²)^{3/2}/3",
    abs(_S21 - _A21**3 * (1 - 2 * _A21**2) ** 1.5 / 3) < 1e-9
    and all(
        abs((4 * a - 2 * t) ** 2 - 4 * (4 * a * a - 4 * a**4 - t * t)) < 1e-9
        for a in (0.2, 0.3, 0.5, 0.6)
        for t in (a - math.sqrt(a * a - 2 * a**4), a + math.sqrt(a * a - 2 * a**4))
    ),
    f"a=1/2 の面積 数値積分 {_S21:.10f} / 式 {_A21**3*(1-2*_A21**2)**1.5/3:.10f}",
)
_cand = max(
    ((i * 1e-5, (i * 1e-5) ** 3 * (1 - 2 * (i * 1e-5) ** 2) ** 1.5 / 3) for i in range(1, 70710)),
    key=lambda pr: pr[1],
)
ok(
    "名理21-1 共通接線が2本あるのは 0<a<√2/2、S(a) の最大は a=1/2 での √2/96",
    abs(_cand[0] - 0.5) < 1e-4 and abs(_cand[1] - math.sqrt(2) / 96) < 1e-9,
    f"最大 a={_cand[0]:.5f} S={_cand[1]:.10f} / √2/96={math.sqrt(2)/96:.10f}",
)

_al = math.log(3) / math.log(2)
_be = math.log(5) / math.log(3)
_ga = math.log(2) / math.log(5)
_p21 = _al + _be + _ga
_q21 = 1 / _al + 1 / _be + 1 / _ga
_f21 = lambda x: x**3 + _p21 * x * x + _q21 * x + 1
ok(
    "名理21-2 αβγ=1、小さい順は γ<β<δ<α、f(x)=(x+α)(x+β)(x+γ)",
    abs(_al * _be * _ga - 1) < 1e-12
    and _ga < _be < 1.5 < _al
    and all(abs(_f21(x) - (x + _al) * (x + _be) * (x + _ga)) < 1e-9 for x in (-0.5, -1, -1.5, 0.3, 2)),
    f"α={_al:.6f} β={_be:.6f} γ={_ga:.6f}",
)
ok(
    "名理21-2 f(-1/2)<0、f(-1)<0、f(-3/2)>0",
    _f21(-0.5) < 0 and _f21(-1) < 0 and _f21(-1.5) > 0,
    f"{_f21(-0.5):+.9f} / {_f21(-1):+.9f} / {_f21(-1.5):+.9f}",
)

_rows21 = [[1, 2, 3, 4, 5], [6, 7, 8, 9], [10, 11], [12]]
_pos21 = {v: (r, c) for r, row in enumerate(_rows21) for c, v in enumerate(row)}


def _mv21(v):
    r, c = _pos21[v]
    out = list(_rows21[r][c + 1 :])
    out += [_rows21[rr][c] for rr in range(r + 1, 4) if c < len(_rows21[rr])]
    return out


_vis21 = {v: Fraction(0) for v in range(1, 13)}
for _v in range(1, 13):
    _vis21[_v] += Fraction(1, 12)
    _ms = _mv21(_v)
    for _m in _ms:
        _vis21[_m] += _vis21[_v] * Fraction(1, len(_ms))
ok(
    "名理21-3 行き止まりは 5,9,11,12 だけで、p5+p9+p11+p12 = 1",
    [v for v in range(1, 13) if not _mv21(v)] == [5, 9, 11, 12]
    and all(m > v for v in range(1, 13) for m in _mv21(v))
    and _vis21[5] + _vis21[9] + _vis21[11] + _vis21[12] == 1,
    "移動はつねに番号を大きくするので、番号順に1回なぞるだけで確率が決まる",
)
ok(
    "名理21-3 p2=2/21、p5=8/35、p11=1/5、最大は p9=2/5",
    _vis21[2] == Fraction(2, 21)
    and _vis21[5] == Fraction(8, 35)
    and _vis21[11] == Fraction(1, 5)
    and _vis21[9] == Fraction(2, 5)
    and max(_vis21[j] for j in (5, 9, 11, 12)) == _vis21[9],
    f"p5={_vis21[5]} p9={_vis21[9]} p11={_vis21[11]} p12={_vis21[12]}",
)

random.seed(20210226)
_cnt21 = {v: 0 for v in range(1, 13)}
_N21 = 120000
for _ in range(_N21):
    _v = random.randint(1, 12)
    _seen = [_v]
    while _mv21(_v):
        _v = random.choice(_mv21(_v))
        _seen.append(_v)
    for _s in _seen:
        _cnt21[_s] += 1
ok(
    "名理21-3 モンテカルロでも同じ値",
    all(abs(_cnt21[j] / _N21 - float(_vis21[j])) < 0.006 for j in (2, 5, 9, 11, 12)),
    " ".join(f"p{j}={_cnt21[j]/_N21:.5f}" for j in (2, 5, 9, 11, 12)),
)

_nx21 = lambda x: 3 * math.floor(x + Fraction(1, 2)) - 2 * x
random.seed(7)
_bad2, _bad3 = 0, 0
for _ in range(120000):
    _x = random.uniform(-50, 50)
    if _x - math.floor(_x) >= 0.5 and not 3 * math.floor(_x + 0.5) - 2 * _x > _x:
        _bad2 += 1
    _y = 3 * math.floor(_x + 0.5) - 2 * _x
    if _y < _x and (abs(_y - (3 * math.floor(_x) - 2 * _x)) > 1e-9 or math.floor(_y) != math.floor(_x) - 1):
        _bad3 += 1
ok(
    "名理21-4 小数部≧1/2 なら増加、減少するなら a_{n+1}=3[a_n]-2a_n かつ [a_{n+1}]=[a_n]-1",
    _bad2 == 0 and _bad3 == 0,
    f"-50〜50 の12万点で反例 {_bad2} 件 / {_bad3} 件",
)
_bad4 = 0
for _i in range(1, 400):
    _a = Fraction(_i, 400)
    _seq = [_a]
    while True:
        _x = _seq[-1]
        _y = 3 * Fraction(math.floor(_x + Fraction(1, 2))) - 2 * _x
        if _y < _x:
            _seq.append(_y)
        else:
            break
    for _k in range(2, len(_seq) + 1):
        if Fraction(4, 3) - _k + Fraction((-2) ** _k, 6) * (1 - 3 * _a) != _seq[_k - 1]:
            _bad4 += 1
ok(
    "名理21-4 a_k = 4/3 - k + (-2)^k(1-3a)/6",
    _bad4 == 0,
    "a=1/400〜399/400 の減少が続く範囲すべてを分数のまま照合して反例 0 件",
)

# ---- 名古屋大学 理科系 2020 ----


def _hyp20(a, b):
    """ax - by = 1 と x²-y²=1 の交点。なければ None。"""
    if b == 0:
        return None
    A, B, C = b * b - a * a, 2 * a, -(1 + b * b)
    if A == 0:
        return None
    D = B * B - 4 * A * C
    if D < 0:
        return None
    xs = [(-B + math.sqrt(D)) / (2 * A), (-B - math.sqrt(D)) / (2 * A)]
    return [(x, (a * x - 1) / b) for x in xs]


_br20 = []
for _a, _b in [(0.3, 1.0), (1.0, 0.3), (2.0, 3.0), (3.0, -2.0), (0.0, 1.0), (1.0, 1.0), (-1.5, 2.5)]:
    _r = _hyp20(_a, _b)
    _both = bool(_r) and min(q[0] for q in _r) < 0 < max(q[0] for q in _r)
    _br20.append(_both == (_a * _a < _b * _b))
ok(
    "名理20-1 直線 ax-by=1 が双曲線の両方の枝と1点ずつで交わるのは a²<b² のとき",
    all(_br20),
    "(a,b) を7通り試し、交点の x 座標が正と負に分かれるかどうかが a²<b² と完全に一致した",
)
_s20 = []
for _a, _b in [(0.3, 1.0), (2.0, 3.0), (3.0, -4.0), (-1.5, 2.5), (0.0, 2.0)]:
    _P, _Q = _hyp20(_a, _b)
    _area = abs((_P[0] - _a) * (_Q[1] - _b) - (_Q[0] - _a) * (_P[1] - _b)) / 2
    _pred = (1 + _b * _b - _a * _a) ** 1.5 / (_b * _b - _a * _a)
    _s20.append(abs(_area - _pred) < 1e-9 and all(abs(q[0] ** 2 - q[1] ** 2 - 1) < 1e-9 for q in (_P, _Q)))
_min20 = min(((u * 1e-5, (1 + u * 1e-5) ** 1.5 / (u * 1e-5)) for u in range(1, 500000)), key=lambda pr: pr[1])
ok(
    "名理20-1 S = (1+b²-a²)^{3/2}/(b²-a²)、最小は b²-a²=2 での 3√3/2",
    all(_s20) and abs(_min20[0] - 2) < 1e-4 and abs(_min20[1] - 3 * math.sqrt(3) / 2) < 1e-9,
    f"外積で出した面積と式が5通りで一致、最小 u={_min20[0]:.5f} S={_min20[1]:.10f} / 3√3/2={3*math.sqrt(3)/2:.10f}",
)


def _isp20(n):
    if n < 2:
        return False
    for d in range(2, math.isqrt(n) + 1):
        if n % d == 0:
            return False
    return True


_ms20 = [m for m in range(1, 100) if len({2, m * m + 1, m**4 + 1}) == 3 and all(_isp20(t) for t in (2, m * m + 1, m**4 + 1))]
_a20ok = True
for _m in _ms20[:6]:
    _tri = [2, _m * _m + 1, _m**4 + 1]
    _pr = _tri[0] * _tri[1] * _tri[2]
    if [a for a in _tri if a * a < _pr // a] != [2, _m * _m + 1]:
        _a20ok = False
ok(
    "名理20-2 a²<bc となるのは a=2 と a=m²+1 の2つ",
    _a20ok and all(m % 2 == 0 for m in _ms20),
    f"条件を満たす m（100未満）={_ms20}、いずれも偶数",
)
_sol20 = True
for _m in _ms20[:5]:
    _N = 2 * (_m * _m + 1) * (_m**4 + 1)
    _found = []
    for _s in range(2, round(_N ** (1 / 3)) + 3):
        if _N % _s:
            continue
        _r = _N // _s - _s * _s
        if _r > 0 and math.isqrt(_r) ** 2 == _r:
            _y = math.isqrt(_r)
            if 0 < _y < _s:
                _found.append((_s - _y, _y))
    if _found != [(2, _m * _m - 1)]:
        _sol20 = False
ok(
    "名理20-2 (x+y)(x²+2y²+2xy)=2(m²+1)(m⁴+1) の正の整数解は (x,y)=(2, m²-1) だけ",
    _sol20,
    f"m={_ms20[:5]} のそれぞれで N の約数を総当たりして確認",
)

_f20s = [
    (lambda x: x * x, "x²"),
    (lambda x: math.exp(0.4 * x), "e^{0.4x}"),
    (lambda x: math.cosh(x - 3), "cosh(x-3)"),
    (lambda x: x**4 - 3 * x + 1, "x⁴-3x+1"),
]
_f20ok = True
for _f, _nm in _f20s:
    _F = lambda x, f=_f: f(x) - f(math.pi - x) - f(math.pi + x) + f(2 * math.pi - x)
    if min(_F(i * math.pi / 4000) for i in range(2001)) < -1e-9:
        _f20ok = False
    if quad(lambda x, f=_f: f(x) * math.cos(x), 0, 2 * math.pi, 20001)[0] < 0:
        _f20ok = False
_g20s = [
    (lambda x: -x, "-x"),
    (lambda x: math.exp(-x), "e^{-x}"),
    (lambda x: 5 - x**3 / 30, "5-x³/30"),
    (lambda x: math.cos(x / 4), "cos(x/4)"),
]
_g20ok = True
for _g, _nm in _g20s:
    _G = lambda t, g=_g: g(t) + g(math.pi - t) - g(math.pi + t) - g(2 * math.pi - t)
    if min(_G(i * math.pi / 4000) for i in range(2001)) <= 0:
        _g20ok = False
    if quad(lambda x, g=_g: g(x) * math.sin(x), 0, 2 * math.pi, 20001)[0] < 0:
        _g20ok = False
ok(
    "名理20-3 f''>0 なら F≧0 かつ ∫f cos ≧0、g'<0 なら G>0 かつ ∫g sin ≧0",
    _f20ok and _g20ok,
    "f を4つ、g を4つ試し、[0,π/2] の2001点と数値積分で確認",
)

_u20, _v20 = Fraction(1), Fraction(0)
_p20 = []
for _n in range(1, 25):
    _p20.append(_v20 / 3)
    _u20, _v20 = (_u20 + _v20) / 3, (2 * _u20 + _v20) / 3
_cf20 = lambda n: ((1 + math.sqrt(2)) ** (n - 1) - (1 - math.sqrt(2)) ** (n - 1)) / (math.sqrt(2) * 3**n)
ok(
    "名理20-4 p_1=0、p_2=2/9、p_3=4/27、p_n = {(1+√2)^{n-1}-(1-√2)^{n-1}}/(√2·3^n)",
    _p20[0] == 0
    and _p20[1] == Fraction(2, 9)
    and _p20[2] == Fraction(4, 27)
    and max(abs(float(_p20[n - 1]) - _cf20(n)) for n in range(1, 25)) < 1e-15,
    f"p_1..p_6 = {[str(x) for x in _p20[:6]]}",
)
ok(
    "名理20-4 N≧2 で Σp_{2m-1} < Σp_{2m}（後攻が有利）",
    all(_p20[n - 1] > _p20[n] for n in range(2, 24))
    and all(
        sum(_p20[2 * m - 2] for m in range(1, (N + 1) // 2 + 1)) < sum(_p20[2 * m - 1] for m in range(1, N // 2 + 1))
        for N in range(2, 25)
    ),
    "n≧2 で p_n>p_{n+1}、N=2〜24 で奇数番の和 < 偶数番の和",
)
random.seed(20200226)
_cnt20 = {}
_N20 = 120000
for _ in range(_N20):
    _pos = [0, 2]
    _k = 0
    while True:
        _who = _k % 2
        _k += 1
        _r = random.randint(1, 6) % 3
        if _r == 1:
            _pos[_who] = (_pos[_who] + 1) % 4
        elif _r == 2:
            _pos[_who] = (_pos[_who] - 1) % 4
        if _pos[0] == _pos[1]:
            _cnt20[_k] = _cnt20.get(_k, 0) + 1
            break
ok(
    "名理20-4 シミュレーションでも同じ",
    all(abs(_cnt20.get(n, 0) / _N20 - float(_p20[n - 1])) < 0.006 for n in range(2, 8)),
    " ".join(f"p{n}={_cnt20.get(n,0)/_N20:.5f}" for n in range(2, 7))
    + f" 後攻={sum(c for n, c in _cnt20.items() if n % 2 == 0)/_N20:.5f}",
)

# ---- 名古屋大学 理科系 2019 ----

_I19 = lambda n: quad(lambda t: 1 / math.cos(t) ** n, 0, math.pi / 3, 40001)[0]
ok(
    "名理19-1 I_1 = log(2+√3)、n≧3 で I_n = {√3·2^{n-2} + (n-2)I_{n-2}}/(n-1)",
    abs(_I19(1) - math.log(2 + math.sqrt(3))) < 1e-9
    and all(
        abs(_I19(n) - (math.sqrt(3) * 2 ** (n - 2) + (n - 2) * _I19(n - 2)) / (n - 1)) < 1e-7
        for n in range(3, 9)
    ),
    f"I_1 数値={_I19(1):.10f} / log(2+√3)={math.log(2+math.sqrt(3)):.10f}、n=3〜8 で漸化式と一致",
)


def _seg19(r, d=0.5):
    if r <= d:
        return 0.0
    return r * r * math.acos(d / r) - d * math.sqrt(r * r - d * d)


_V19 = quad(lambda z: _seg19(1 - z), 0, 0.5, 40001)[0]
_pv19 = math.pi / 9 - math.sqrt(3) / 6 + math.log(2 + math.sqrt(3)) / 24
ok(
    "名理19-1 円錐を x=1/2 で切った小さいほうの体積は π/9 - √3/6 + log(2+√3)/24",
    abs(_V19 - _pv19) < 1e-8,
    f"弓形の面積を z で数値積分 {_V19:.10f} / 式 {_pv19:.10f}",
)

_ok19 = True
for _ab, _ac in [(4.0, math.sqrt(21)), (math.sqrt(21), 4.0)]:
    _cosA = (_ab * _ab + _ac * _ac - 49) / (2 * _ab * _ac)
    _Bp = (_ab, 0.0, 0.0)
    _Cp = (_ac * _cosA, _ac * math.sqrt(1 - _cosA**2), 0.0)
    _dot = _Bp[0] * _Cp[0] + _Bp[1] * _Cp[1]
    _k19 = -_dot
    _df = _ac * _ac - _ab * _ab
    _b = math.sqrt((_df + math.sqrt(_df * _df + 4 * _k19 * _k19)) / 2)
    _c = _k19 / _b
    _B = (_Bp[0], _Bp[1], _b)
    _C = (_Cp[0], _Cp[1], _c)
    if not (
        _cosA < 0
        and abs(_dot + _b * _c) < 1e-9
        and abs(math.dist((0, 0, 0), _B) - 5) < 1e-9
        and abs(math.dist((0, 0, 0), _C) - 5) < 1e-9
        and abs(sum(_B[i] * _C[i] for i in range(3))) < 1e-9
        and abs(math.dist(_Bp, _Cp) - 7) < 1e-9
    ):
        _ok19 = False
ok(
    "名理19-2 AB'·AC' + B'B·C'C = 0、∠B'AC' は鈍角、3辺 4・√21・7 から AB = 5",
    _ok19,
    "AB'=4 の場合 (b,c)=(3,2)、AB'=√21 の場合 (b,c)=(2,3)。どちらも AB=AC=5 で AB·AC=0",
)

_ns19 = []
_n19 = 1
while len(_ns19) < 12:
    _m19 = math.isqrt(_n19)
    if _m19 * _m19 != _n19 and 0.01 <= math.sqrt(_n19) - _m19 < 0.1:
        _ns19.append(_n19)
    _n19 += 1
ok(
    "名理19-3 √n の小数第1位が 0、第2位が 0 以外になる n は 26 が最小、10番目は 145",
    _ns19[0] == 26 and _ns19[9] == 145,
    f"小さい順に {_ns19}",
)


def _cyc19(p):
    n = len(p)
    seen = [False] * n
    out = []
    for i in range(n):
        if seen[i]:
            continue
        L = 0
        j = i
        while not seen[j]:
            seen[j] = True
            j = p[j] - 1
            L += 1
        out.append(L)
    return out


_all3 = list(itertools.permutations(range(1, 4)))
_four19 = [p for p in itertools.permutations(range(1, 5)) if _cyc19(p) == [4]]
ok(
    "名理19-4 n=3 で長さ1のサイクルを含む確率は 2/3、n=4 で長さ4のサイクルを含むのは6個",
    Fraction(sum(1 for p in _all3 if 1 in _cyc19(p)), 6) == Fraction(2, 3)
    and sorted(_four19) == [(2, 3, 4, 1), (2, 4, 1, 3), (3, 1, 4, 2), (3, 4, 2, 1), (4, 1, 2, 3), (4, 3, 1, 2)],
    f"n=4 の6個 = {sorted(_four19)}",
)
_bad19 = sum(
    1
    for n in range(1, 60)
    for k in range(1, n + 1)
    if not sum(1 / j for j in range(k, n + 1)) > math.log(n + 1) - math.log(k)
)
_p19 = {}
for _n in (5, 7, 9):
    _tot = 0
    _hit = 0
    for _p in itertools.permutations(range(1, _n + 1)):
        _tot += 1
        if max(_cyc19(_p)) >= (_n + 1) // 2:
            _hit += 1
    _p19[_n] = Fraction(_hit, _tot)
ok(
    "名理19-4 Σ[j=k..n] 1/j > log(n+1)-log k、n が奇数なら p = Σ[L=(n+1)/2..n] 1/L > log 2",
    _bad19 == 0
    and all(_p19[n] == sum(Fraction(1, L) for L in range((n + 1) // 2, n + 1)) for n in _p19)
    and all(float(_p19[n]) > math.log(2) for n in _p19),
    f"1≦k≦n≦59 で反例 0 件、p(5)={_p19[5]}, p(7)={_p19[7]}, p(9)={_p19[9]} はいずれも log2={math.log(2):.6f} 超",
)

# ---- 名古屋大学 文科系 2025（第2問・第3問は理科系の第2問・第4問と同じ問題） ----

_b25 = True
for _p, _q, _t in [(-2, 3, 0.4), (1, 5, 1.0), (-4, -1, 0.75), (0, 7, 0.1)]:
    _bb = -(_p + _q)
    _cc = _p * _q
    _D = _bb * _bb - 4 * _cc
    _r = (1 + _t) / 2 * _p + (1 - _t) / 2 * _q
    _s = (1 - _t) / 2 * _p + (1 + _t) / 2 * _q
    _area = quad(lambda x, b=_bb, c=_cc: -(x * x + b * x + c), _r, _s, 20001)[0]
    if not (
        abs((_q - _s) - (1 - _t) * math.sqrt(_D) / 2) < 1e-9
        and abs((_r - _p) - (1 - _t) * math.sqrt(_D) / 2) < 1e-9
        and abs((_s + _r) + _bb) < 1e-9
        and abs((_s - _r) - _t * math.sqrt(_D)) < 1e-9
        and abs(_s * _r - (_bb * _bb - _t * _t * _D) / 4) < 1e-9
        and abs(_s * _s + _r * _r - (_bb * _bb + _t * _t * _D) / 2) < 1e-9
        and abs(_area - _t * (3 - _t * _t) * _D**1.5 / 12) < 1e-8
    ):
        _b25 = False
ok(
    "名文25-1 q-s=r-p=(1-t)√(b²-4c)/2、s+r=-b、s-r=t√(b²-4c)、sr と s²+r²、面積 t(3-t²)(b²-4c)^{3/2}/12",
    _b25,
    "(p,q,t) を4通りとって、すべての式と数値積分した面積が一致した（t=1 では 1/6 公式に戻る）",
)

_adj25 = {1: [2, 4], 2: [1, 3, 5], 3: [2, 6], 4: [1, 5], 5: [2, 4, 6], 6: [3, 5]}


def _cnt25(n):
    c = 0
    for seq in itertools.product(range(1, 7), repeat=n):
        st = [0] * 7
        for ch in seq:
            for j in _adj25[ch]:
                st[j] ^= 1
        if all(st[i] == 1 for i in range(1, 7)):
            c += 1
    return c


_c2, _c4 = _cnt25(2), _cnt25(4)
_par25 = True
for _n in (2, 3, 4):
    for _seq in itertools.product(range(1, 7), repeat=_n):
        _st = [0] * 7
        for _ch in _seq:
            for _j in _adj25[_ch]:
                _st[_j] ^= 1
        _allrev = all(_st[i] == 1 for i in range(1, 7))
        _cs = [_seq.count(i) for i in range(1, 7)]
        _cond = _cs[1] % 2 == 1 and _cs[4] % 2 == 1 and all(_cs[i] % 2 == 0 for i in (0, 2, 3, 5))
        if _allrev != _cond:
            _par25 = False
ok(
    "名文25-3 A={②,⑤} が奇数回・B={①,③,④,⑥} が偶数回が必要十分、p_2=1/18、p_4=7/162",
    _par25 and Fraction(_c2, 36) == Fraction(1, 18) and Fraction(_c4, 6**4) == Fraction(7, 162),
    f"n=2,3,4 の全列挙で判定が完全一致。p_2={Fraction(_c2,36)}、p_4={Fraction(_c4,6**4)}（n が奇数なら 0）",
)

# ---- 名古屋大学 文科系 2024 ----

ok(
    "名文24-1 x³-3x²-50=(x-5)(x²+2x+10) で実数解は x=5、(p,q)=((5±√5)/2)",
    all(
        abs((x - 5) * (x * x + 2 * x + 10) - (x**3 - 3 * x * x - 50)) < 1e-9 for x in (-2.3, 0.7, 4, 11)
    )
    and 2 * 2 - 4 * 10 < 0
    and abs(((5 - math.sqrt(5)) / 2) ** 3 + ((5 + math.sqrt(5)) / 2) ** 3 - 50) < 1e-9
    and abs(2 / (5 - math.sqrt(5)) + 2 / (5 + math.sqrt(5)) - 1) < 1e-12,
    f"p={(5-math.sqrt(5))/2:.9f}, q={(5+math.sqrt(5))/2:.9f}、p+q=pq=5、p³+q³=50、1/p+1/q=1",
)

_b24 = True
for _t in (-3.0, 1.0, 2.0, -1.0, -5.0, 3.5):
    _m = (_t + 4) / 2
    _P = (_t / 2, _t * _t / 4 + _t)
    _Q = (-2.0, -_t - 4)
    _X = _t * _t / 4 + _t
    _A = (-1.0, -2.0)
    _AP2 = (_P[0] - _A[0]) ** 2 + (_P[1] - _A[1]) ** 2
    _AQ2 = (_Q[0] - _A[0]) ** 2 + (_Q[1] - _A[1]) ** 2
    if not (
        abs(-_Q[0] ** 2 + _t * _Q[0] + _t - _Q[1]) < 1e-9
        and abs(_m * _Q[0] - _Q[1]) < 1e-9
        and abs(_AP2 - (_X * _X + 5 * _X + 5)) < 1e-9
        and abs(_AQ2 - (4 * _X + 5)) < 1e-9
        and abs((_AP2 - _AQ2) - (_X * _X + _X)) < 1e-9
    ):
        _b24 = False
_good24 = [
    i / 1000
    for i in range(-6000, 6001)
    if i != 0 and i != -4000 and ((i / 1000) ** 2 / 4 + i / 1000) ** 2 + ((i / 1000) ** 2 / 4 + i / 1000) < 0
]
ok(
    "名文24-2 P(t/2, t²/4+t)、Q(-2, -t-4)（t≠-4）、AP²-AQ²=X²+X、AP<AQ は -4<t<0 かつ t≠-2",
    _b24 and min(_good24) == -3.999 and max(_good24) == -0.001 and -2.0 not in _good24,
    f"t を6通りで照合、AP<AQ の範囲は [{min(_good24)}, {max(_good24)}] で t=-2 を除く",
)


def _sc24(seq):
    n = len(seq)
    pos = 0
    a = []
    for ch in seq:
        pos += 2 if ch == "H" else 3
        a.append(pos)
    return sum(a) if a[-1] == 2 * n + 2 else 0


_n4 = list(itertools.product("HT", repeat=4))
_n9 = list(itertools.product("HT", repeat=9))
ok(
    "名文24-3 a_n = 2n+r、n=4 で得点≠0 が 3/8・得点25 が 1/8、n=9 で得点100 が 1/128・奇数が 5/128",
    all(
        2 * (len(s) - s.count("T")) + 3 * s.count("T") == 2 * len(s) + s.count("T")
        for n in range(1, 8)
        for s in itertools.product("HT", repeat=n)
    )
    and Fraction(sum(1 for s in _n4 if _sc24(s) != 0), 16) == Fraction(3, 8)
    and Fraction(sum(1 for s in _n4 if _sc24(s) == 25), 16) == Fraction(1, 8)
    and Fraction(sum(1 for s in _n9 if _sc24(s) == 100), 512) == Fraction(1, 128)
    and Fraction(sum(1 for s in _n9 if _sc24(s) % 2 == 1), 512) == Fraction(5, 128),
    "n=4 の16通り・n=9 の512通りを全列挙して確認（n=9 の 0 以外の得点は 93〜107）",
)

# ---- 名古屋大学 文科系 2023 ----

_f23ok = True
for _a in (-3.0, -1.0, 0.0, 2.0, 5.0):
    _f = lambda x, a=_a: x**3 - (a + 2) * x * x + (a - 2) * x + 2 * a + 1
    _g = lambda x: -x * x + 1
    if not all(abs(_f(x) - _g(x) - (x + 1) * (x - 2) * (x - _a)) < 1e-9 for x in (-2.5, -0.3, 1.1, 3.7)):
        _f23ok = False
    if (len({-1.0, 2.0, _a}) == 2) != (_a in (-1.0, 2.0)):
        _f23ok = False
_ext = {}
for _a in (-1.0, 2.0):
    _f = lambda x, a=_a: x**3 - (a + 2) * x * x + (a - 2) * x + 2 * a + 1
    _D = 4 * (_a + 2) ** 2 - 12 * (_a - 2)
    _ext[_a] = _f((2 * (_a + 2) - math.sqrt(_D)) / 6)
ok(
    "名文23-1 f-g=(x+1)(x-2)(x-a)、共有点2個は a=-1 または a=2、極大値>1 は a=2 だけ",
    _f23ok and _ext[-1.0] < 1 and _ext[2.0] > 1 and abs(_ext[2.0] - 5) < 1e-9,
    f"a=-1 の極大値 {_ext[-1.0]:.6f}、a=2 の極大値 {_ext[2.0]:.6f}（極小は -121/27={-121/27:.6f}）",
)

_A23 = (0, 0, 1)
_B23 = (1, 0, 1)
_E23 = (0, 0, 0)
_F23v = (1, 0, 0)
_G23 = (1, 1, 0)


def _vol23(p1, p2, p3, p4):
    u = [p2[i] - p1[i] for i in range(3)]
    v = [p3[i] - p1[i] for i in range(3)]
    w = [p4[i] - p1[i] for i in range(3)]
    cr = (v[1] * w[2] - v[2] * w[1], v[2] * w[0] - v[0] * w[2], v[0] * w[1] - v[1] * w[0])
    return abs(sum(u[i] * cr[i] for i in range(3))) / 6


_g23ok = True
for _p in (0.0, 0.2, 0.5, math.sqrt(2) - 1, 0.9, 1.0):
    _t = _p / (1 + _p)
    _X = (_t, _t, 1 - _t)
    _P = (0, _p, 1)
    _s = 1 / (1 + _p)
    _cr = (
        (_p * (-_t) - 0 * _t),
        (0 * _t - 0 * (-_t)),
        (0 * _t - _p * _t),
    )
    _ar = math.sqrt(sum(c * c for c in _cr)) / 2
    _V = _vol23(_A23, _B23, _P, _X) + _vol23(_E23, _F23v, _G23, _X)
    if not (
        all(abs(_X[i] - (_F23v[i] + _s * (_P[i] - _F23v[i]))) < 1e-12 for i in range(3))
        and abs(math.dist(_A23, _X) - math.sqrt(3) * _p / (1 + _p)) < 1e-9
        and abs(_ar - math.sqrt(2) * _p * _p / (2 * (1 + _p))) < 1e-9
        and abs(_V - (_p * _p + 1) / (6 * (1 + _p))) < 1e-9
    ):
        _g23ok = False
_mn23 = min((((i / 100000), (((i / 100000) ** 2 + 1) / (6 * (i / 100000 + 1)))) for i in range(100001)), key=lambda z: z[1])
ok(
    "名文23-2 AX=√3p/(1+p)、△APX=√2p²/(2(1+p))、V=(p²+1)/(6(1+p))、最小は p=√2-1 での (√2-1)/3",
    _g23ok and abs(_mn23[0] - (math.sqrt(2) - 1)) < 1e-4 and abs(_mn23[1] - (math.sqrt(2) - 1) / 3) < 1e-9,
    f"X は AG 上にも FP 上にもある。最小 p={_mn23[0]:.5f} V={_mn23[1]:.9f} / (√2-1)/3={(math.sqrt(2)-1)/3:.9f}",
)

_d23 = {8: Fraction(1)}
for _ in range(8):
    _nd = {}
    for _c, _pr in _d23.items():
        for _k in (1, 2, 3, 4):
            _nc = _c - 1 if _c >= _k else _c
            _nd[_nc] = _nd.get(_nc, Fraction(0)) + _pr * Fraction(1, 4)
    _d23 = _nd
_balls23 = (1, 1, 2, 2, 3, 3, 4, 4)
_tot23 = 0
_hit23 = 0
for _perm in set(itertools.permutations(_balls23)):
    _tot23 += 1
    _c = 8
    for _k in _perm:
        if _c >= _k:
            _c -= 1
    if _c == 0:
        _hit23 += 1
ok(
    "名文23-3 復元で1枚残るのは 9/16、非復元で 0 枚になるのは 1/14",
    _d23[1] == Fraction(9, 16)
    and sum(_d23.values()) == 1
    and Fraction(_hit23, _tot23) == Fraction(1, 14),
    f"残り枚数の分布 {{0:{_d23[0]}, 1:{_d23[1]}, 2:{_d23[2]}, 3:{_d23[3]}}}、非復元は {_hit23}/{_tot23}",
)

# ---- 名古屋大学 文科系 2022（第1問・第2問は理科系と同じ問題） ----

_s22ok = True
for _a, _b in [(1.5, 4.5), (0.0, 1.0), (2.0, 3.0), (-1.0, 2.0), (0.0, 0.0), (3.0, 2.0)]:
    _D = -2 * _a * _a + 6 * _b
    if (_D > 0) != (_b > _a * _a / 3):
        _s22ok = False
    if _D <= 0:
        continue
    _r = math.sqrt(_D)
    _al = (4 * _a - 2 * _r) / 6
    _be = (4 * _a + 2 * _r) / 6
    _S = quad(lambda x, a=_a, b=_b: (-((x - a) ** 2) + b) - x * x / 2, _al, _be, 20001)[0]
    if abs(_S - 4 * math.sqrt(2) / 27 * (3 * _b - _a * _a) ** 1.5) > 1e-8:
        _s22ok = False
for _a in (0.0, 1.0, -2.5, 3.0):
    _b = _a * _a / 3 + 6
    _r = math.sqrt(-2 * _a * _a + 6 * _b)
    _al = (4 * _a - 2 * _r) / 6
    _be = (4 * _a + 2 * _r) / 6
    if abs(quad(lambda x, a=_a, b=_b: (-((x - a) ** 2) + b) - x * x / 2, _al, _be, 20001)[0] - 16) > 1e-7:
        _s22ok = False
_mx22 = max(
    (
        (i / 20000, 4 * math.sqrt(2) / 27 * (3 * (i / 20000 + 3) - (i / 20000) ** 2) ** 1.5)
        for i in range(-80000, 80001)
        if 3 * (i / 20000 + 3) - (i / 20000) ** 2 > 0
    ),
    key=lambda z: z[1],
)
ok(
    "名文22-3 交点2個は b>a²/3、S=(4√2/27)(3b-a²)^{3/2}、S=16 は 3b-a²=18、b≦a+3 での最大は 5√10/2",
    _s22ok and abs(_mx22[0] - 1.5) < 1e-4 and abs(_mx22[1] - 5 * math.sqrt(10) / 2) < 1e-8,
    f"最大 a={_mx22[0]:.5f} S={_mx22[1]:.9f} / 5√10/2={5*math.sqrt(10)/2:.9f}",
)

# ---- 名古屋大学 文科系 2020 ----

_lim20 = math.sqrt(3) - 1
_c20 = all(
    (max(abs(a * (1 - math.sqrt(3)) / 2), abs(a * (1 + math.sqrt(3)) / 2)) <= 1 + 1e-12)
    == (abs(a) <= _lim20 + 1e-12)
    for a in (-1.0, -0.8, -0.73, -0.4, 0.0, 0.3849, 0.7, 0.73, 0.8, 1.2)
)
_s20 = all(
    abs(
        quad(lambda x, a=a: abs(2 * x * x - 2 * a * x - a * a), -1, 1, 20001)[0]
        - (2 * math.sqrt(3) * abs(a) ** 3 - 2 * a * a + 4 / 3)
    )
    < 1e-7
    for a in (-0.6, -0.2, 0.0, 0.2, 0.3849, 0.6, 0.73)
)
_m20 = min(
    ((i / 100000, 2 * math.sqrt(3) * (i / 100000) ** 3 - 2 * (i / 100000) ** 2 + 4 / 3) for i in range(int(_lim20 * 100000) + 1)),
    key=lambda z: z[1],
)
ok(
    "名文20-1 解が [-1,1] に入るのは |a|≦√3-1、S(a)=2√3|a|³-2a²+4/3、最小は a=±2√3/9 での 100/81",
    _c20 and _s20 and abs(_m20[0] - 2 * math.sqrt(3) / 9) < 1e-4 and abs(_m20[1] - 100 / 81) < 1e-9,
    f"最小 a={_m20[0]:.6f} S={_m20[1]:.10f} / 2√3/9={2*math.sqrt(3)/9:.6f}, 100/81={100/81:.10f}",
)

random.seed(20200226)
_bad20 = 0
for _ in range(20000):
    _th = random.uniform(0, 2 * math.pi)
    _p = (math.cos(_th), math.sin(_th))
    for _sg in (1, -1):
        _q = (math.cos(_th + _sg * 2 * math.pi / 3), math.sin(_th + _sg * 2 * math.pi / 3))
        _r = (-_p[0] - _q[0], -_p[1] - _q[1])
        _d = [math.dist(_p, _q), math.dist(_q, _r), math.dist(_r, _p)]
        if abs(math.hypot(*_r) - 1) > 1e-9 or max(_d) - min(_d) > 1e-9 or abs(_d[0] - math.sqrt(3)) > 1e-9:
            _bad20 += 1
_hn = 1 / 3
_R20 = math.sqrt(1 - _hn * _hn)
_pts20 = [(_R20 * math.cos(2 * math.pi * k / 3), _R20 * math.sin(2 * math.pi * k / 3), _hn) for k in range(3)]
_D20 = (0.0, 0.0, -1.0)
_sum20 = tuple(sum(q[i] for q in _pts20) + _D20[i] for i in range(3))
_edges20 = [
    math.dist(_pts20[0], _pts20[1]),
    math.dist(_pts20[1], _pts20[2]),
    math.dist(_pts20[2], _pts20[0]),
    math.dist(_pts20[0], _D20),
    math.dist(_pts20[1], _D20),
    math.dist(_pts20[2], _D20),
]
ok(
    "名文20-2 単位ベクトル3本の和が 0 なら正三角形、|OH|=1/3 の配置では正四面体（1辺 2√6/3）",
    _bad20 == 0
    and math.hypot(*_sum20) < 1e-12
    and max(_edges20) - min(_edges20) < 1e-12
    and abs(_edges20[0] - 2 * math.sqrt(6) / 3) < 1e-12,
    f"2万通りで反例 0 件、6辺 {_edges20[0]:.9f} = 2√6/3 = {2*math.sqrt(6)/3:.9f}",
)


def _RS20(n):
    r = 0
    s = 0
    for x2 in range(1, n + 1):
        for y2 in range(1, n - x2 + 1):
            r += x2 * y2
            s += x2
    return r, s


ok(
    "名文20-3 R(n)=(n-1)n(n+1)(n+2)/24、S(n)=(n-1)n(n+1)/6、R(n)=1001 は n=12 だけ",
    all(
        _RS20(n) == ((n - 1) * n * (n + 1) * (n + 2) // 24, (n - 1) * n * (n + 1) // 6) for n in range(1, 13)
    )
    and [n for n in range(1, 60) if (n - 1) * n * (n + 1) * (n + 2) // 24 == 1001] == [12],
    f"R(3)={_RS20(3)[0]}, R(4)={_RS20(4)[0]}, S(3)={_RS20(3)[1]}, S(4)={_RS20(4)[1]}",
)

# ---- 名古屋大学 文科系 2019 ----


def _cnt19(a):
    """g(x) = x³/3 + (a/2-1)x² - 2ax + a の相異なる実数解の個数（2分法で数える）。"""
    g = lambda x: x**3 / 3 + (a / 2 - 1) * x * x - 2 * a * x + a
    xs = [-a, 2.0]
    xs.sort()
    if abs(xs[0] - xs[1]) < 1e-12:
        return 1
    v0, v1 = g(xs[0]), g(xs[1])
    if v0 * v1 < 0:
        return 3
    if v0 == 0 or v1 == 0:
        return 2
    return 1


_lo19 = -3 - math.sqrt(3)
_hi19 = -3 + math.sqrt(3)
_bad19 = 0
for _i in range(-9000, 6001):
    _a = _i / 1000
    _pred = (_a < _lo19 - 1e-9) or (-4 / 3 + 1e-9 < _a < _hi19 - 1e-9) or (_a > 1e-9)
    if _pred != (_cnt19(_a) == 3):
        _bad19 += 1
ok(
    "名文19-1 g'=(x+a)(x-2)、極値の積 <0 ⟺ a<-3-√3 または -4/3<a<-3+√3 または a>0",
    _bad19 == 0,
    f"a を -9〜6 まで 0.001 刻みの15001点で照合して差異 0 件（-3-√3={_lo19:.6f}, -4/3={-4/3:.6f}, -3+√3={_hi19:.6f}）",
)

_ok19b = True
for _al in (0.3, 1.0, 2.0, 3.0):
    _k = math.tan(_al / 2)
    _z = complex(1, 0)
    _pts = [_z]
    for _ in range(5):
        _den = 1 + _k * _k
        _nx = ((1 - _k * _k) * _z.real - 2 * _k * _z.imag) / _den
        _ny = (2 * _k * _z.real + (1 - _k * _k) * _z.imag) / _den
        _z = complex(_nx, _ny)
        _pts.append(_z)
    if max(abs(_pts[n] - cmath.exp(1j * n * _al)) for n in range(len(_pts))) > 1e-12:
        _ok19b = False
    _ar = abs(_pts[1].real * _pts[2].imag - _pts[2].real * _pts[1].imag) / 2
    if abs(_ar - _k / (1 + _k * _k)) > 1e-12:
        _ok19b = False
ok(
    "名文19-2 P_n = (cos nα, sin nα)（k=tan(α/2)）、△P_nOP_{n+1} = k/(1+k²)",
    _ok19b,
    "α=0.3,1,2,3 で漸化式を5回まわし、回転公式と面積の両方が一致した",
)


def _hasint19(a, b, c):
    D = b * b - 4 * a * c
    if D < 0:
        return False
    sq = math.isqrt(D)
    if sq * sq != D:
        return False
    return (b + sq) % (2 * a) == 0 or (b - sq) % (2 * a) == 0


def _allint19(a, b, c):
    D = b * b - 4 * a * c
    if D < 0:
        return False
    sq = math.isqrt(D)
    if sq * sq != D:
        return False
    return (b + sq) % (2 * a) == 0 and (b - sq) % (2 * a) == 0


_n1 = sum(1 for b in range(1, 7) for c in range(1, 7) if _hasint19(1, b, c))
_n2 = sum(1 for a in range(1, 7) for b in range(1, 7) for c in range(1, 7) if _allint19(a, b, c))
_n3 = sum(1 for a in range(1, 7) for b in range(1, 7) for c in range(1, 7) if _hasint19(a, b, c))
ok(
    "名文19-3 (1) 7/36、(2) 10/216=5/108、(3) 18/216=1/12",
    Fraction(_n1, 36) == Fraction(7, 36)
    and Fraction(_n2, 216) == Fraction(5, 108)
    and Fraction(_n3, 216) == Fraction(1, 12),
    f"全列挙で {_n1}/36、{_n2}/216、{_n3}/216（(3) の a ごとの内訳は 7,5,3,2,1,0）",
)

# ---- 東北大学 理系 2025 ----

_d1t = {0: Fraction(1)}
_p1t = {}
for _n in range(1, 10):
    _nd = {}
    for _pos, _pr in _d1t.items():
        _nd[_pos + 1] = _nd.get(_pos + 1, Fraction(0)) + _pr * Fraction(3, 4)
        _nd[_pos - 2] = _nd.get(_pos - 2, Fraction(0)) + _pr * Fraction(1, 4)
    _d1t = _nd
    _p1t[_n] = _d1t.get(0, Fraction(0))
ok(
    "東北理25-1 1回で +1 が 3/4・-2 が 1/4、n回後の位置は n-3k。P(3)=27/64、P(6)=1215/4096、3∤n なら 0",
    _p1t[3] == Fraction(27, 64)
    and _p1t[6] == Fraction(1215, 4096)
    and all(_p1t[n] == 0 for n in (1, 2, 4, 5, 7, 8))
    and _p1t[9] == Fraction(15309, 65536),
    f"P(3)={_p1t[3]}, P(6)={_p1t[6]}, P(9)={_p1t[9]}、n=1,2,4,5,7,8 は 0",
)

_x2t, _y2t = Fraction(2), Fraction(1, 2)
_xs2t = [_x2t]
for _ in range(4):
    _x2t, _y2t = _x2t**5 * _y2t**2, _x2t * _y2t**6
    _xs2t.append(_x2t)
_a2t, _b2t = 1, -1
_c2a, _c2b = [], []
for _ in range(6):
    _c2a.append(_a2t + 2 * _b2t)
    _c2b.append(_a2t - _b2t)
    _a2t, _b2t = 5 * _a2t + 2 * _b2t, _a2t + 6 * _b2t
ok(
    "東北理25-2 k=2（公比7）と k=-1（公比4）、x_n = 2^{(4^n - 7^{n-1})/3}",
    all(_c2a[i + 1] == 7 * _c2a[i] for i in range(5))
    and all(_c2b[i + 1] == 4 * _c2b[i] for i in range(5))
    and all(
        _xs2t[n - 1] == Fraction(2) ** Fraction(4**n - 7 ** (n - 1), 3) for n in range(1, 6)
    ),
    f"a_n+2b_n={_c2a[:4]}（公比7）、a_n-b_n={_c2b[:4]}（公比4）、指数は "
    + str([Fraction(4**n - 7 ** (n - 1), 3) for n in range(1, 6)]),
)


def _has3t(a):
    """f(x)=x⁴+(4a/3)x³+(a+2)x² が極大値をもつか、x=0 で極大か。"""
    f = lambda x: x**4 + 4 * a / 3 * x**3 + (a + 2) * x * x
    g = lambda x: 2 * x * x + 2 * a * x + (a + 2)
    D = a * a - 2 * (a + 2)
    rs = [0.0]
    if D > 0:
        rs += [(-2 * a - 2 * math.sqrt(D)) / 4, (-2 * a + 2 * math.sqrt(D)) / 4]
    rs = sorted(set(round(r, 10) for r in rs))
    mx = [r for r in rs if f(r - 1e-5) < f(r) > f(r + 1e-5)]
    return len(mx) > 0, any(abs(r) < 1e-12 for r in mx)


_b3a = _b3b = 0
for _i in range(-6000, 6001):
    _a = _i / 1000
    _h, _z = _has3t(_a)
    if _h != (_a * _a - 2 * _a - 4 > 1e-9 and abs(_a + 2) > 1e-9):
        _b3a += 1
    if _z != (_a < -2 - 1e-9):
        _b3b += 1
ok(
    "東北理25-3 極大値をもつ ⟺ a²-2a-4>0 かつ a≠-2、x=0 で極大 ⟺ a<-2",
    _b3a == 0 and _b3b == 0,
    f"a を -6〜6 まで 0.001 刻みの12001点で照合、差異 {_b3a} 件 / {_b3b} 件（1±√5 = {1-math.sqrt(5):.6f}, {1+math.sqrt(5):.6f}）",
)

_ok4t = True
for _n in (1, 2, 3, 5, 10):
    _t = math.exp(1 / _n)
    _f = lambda x, n=_n: n * math.log(x)
    _g = lambda x, n=_n: x**n / math.e
    if abs(_f(_t) - 1) > 1e-12 or abs(_g(_t) - 1) > 1e-12 or abs(_n / _t - _n * _t ** (_n - 1) / math.e) > 1e-12:
        _ok4t = False
    _S = quad(_g, 1e-9, 1, 20001)[0] + quad(lambda x, f=_f, g=_g: g(x) - f(x), 1, _t, 20001)[0]
    if abs(_S - (_n * _n * math.exp(1 / _n) / (_n + 1) - _n)) > 1e-7:
        _ok4t = False
_lim4t = 100000**2 * math.exp(1e-5) / 100001 - 100000
ok(
    "東北理25-4 a=1/e、接点 (e^{1/n},1)、S_n = n²e^{1/n}/(n+1) - n、lim S_n = 0",
    _ok4t and _lim4t < 1e-4,
    f"n=1,2,3,5,10 で接点・面積を確認。n=100000 で S_n={_lim4t:.9f}（≒1/(2n)）",
)

random.seed(20250226)
_b5t = 0
for _ in range(20000):
    _v = [random.gauss(0, 1) for _ in range(3)]
    _nn = math.hypot(*_v)
    if _nn < 1e-6:
        continue
    _a5, _b5, _c5 = (t / _nn for t in _v)
    if abs(_c5 - 1) < 1e-9:
        continue
    _p5, _q5 = _a5 / (1 - _c5), _b5 / (1 - _c5)
    _s5 = 1 / (1 - _c5)
    _D5 = _p5 * _p5 + _q5 * _q5 + 1
    _back = (2 * _p5 / _D5, 2 * _q5 / _D5, (_p5 * _p5 + _q5 * _q5 - 1) / _D5)
    if abs(_p5 - _s5 * _a5) > 1e-9 or abs(_q5 - _s5 * _b5) > 1e-9:
        _b5t += 1
    if max(abs(_back[i] - (_a5, _b5, _c5)[i]) for i in range(3)) > 1e-9:
        _b5t += 1
_circ5 = []
for _ in range(400000):
    _v = [random.gauss(0, 1) for _ in range(3)]
    _nn = math.hypot(*_v)
    _a5, _b5, _c5 = (t / _nn for t in _v)
    if abs(3 * _a5 + 4 * _b5 + 5 * _c5 - 2.5) < 1e-3 and abs(_c5 - 1) > 1e-6:
        _circ5.append(math.hypot(_a5 / (1 - _c5) + 1.2, _b5 / (1 - _c5) + 1.6))
ok(
    "東北理25-5 Q=(a/(1-c), b/(1-c))、逆写像、平面 3x+4y+5z=5/2 との交わりの像は中心(-6/5,-8/5)・半径√7 の円",
    _b5t == 0 and _circ5 and max(abs(d - math.sqrt(7)) for d in _circ5) < 5e-3,
    f"2万点で立体射影と逆写像の反例 0 件。平面上の{len(_circ5)}点で距離は √7={math.sqrt(7):.6f} の近く",
)

_R6t = 1 / (2 * math.sin(math.radians(36)))
_r6t = 1 / (2 * math.tan(math.radians(36)))


def _peri6t(th_deg):
    th = math.radians(th_deg)
    return 2 * _r6t * 5 * (math.tan(th / 2) + math.tan((math.radians(72) - th) / 2))


def _clip6t(poly, a, b, c):
    out = []
    for i in range(len(poly)):
        P, Q = poly[i], poly[(i + 1) % len(poly)]
        fp = a * P[0] + b * P[1] - c
        fq = a * Q[0] + b * Q[1] - c
        if fp <= 0:
            out.append(P)
        if fp * fq < 0:
            t = fp / (fp - fq)
            out.append((P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])))
    return out


_ok6t = True
for _th in (10, 24, 36, 50, 70):
    _poly = [
        (_R6t * math.cos(math.radians(90 + 72 * i)), _R6t * math.sin(math.radians(90 + 72 * i)))
        for i in range(5)
    ]
    for _i in range(5):
        _ang = math.radians(126 + 72 * _i + _th)
        _poly = _clip6t(_poly, math.cos(_ang), math.sin(_ang), _r6t)
    _per = sum(math.dist(_poly[i], _poly[(i + 1) % len(_poly)]) for i in range(len(_poly)))
    if len(_poly) != 10 or abs(_per - _peri6t(_th)) > 1e-9:
        _ok6t = False
_min6t = min(((t / 1000, _peri6t(t / 1000)) for t in range(1, 72000)), key=lambda z: z[1])
ok(
    "東北理25-6 対角線 (1+√5)/2、ℓ_θ = 10r{tan(θ/2)+tan(36°-θ/2)}、最小は θ=36° での 2√5",
    abs(2 * _R6t * math.sin(math.radians(72)) - (1 + math.sqrt(5)) / 2) < 1e-12
    and _ok6t
    and abs(_min6t[0] - 36) < 1e-2
    and abs(_min6t[1] - 2 * math.sqrt(5)) < 1e-9,
    f"5通りの θ で多角形クリッピングの周と式が一致（いずれも十角形）。最小 θ={_min6t[0]:.3f}° ℓ={_min6t[1]:.9f} / 2√5={2*math.sqrt(5):.9f}",
)

# ---- 東北大学 理系 2024 ----

_ok1u = True
for _a in (0.25, 0.5, 1.0, 2.0):
    _f = lambda x, a=_a: x * x - 2 * a * x + 4 * a * a
    if abs(_f(4 * _a) / (4 * _a) - 3 * _a) > 1e-12 or abs(_f(2 * _a) / (2 * _a) - (2 * (2 * _a) - 2 * _a)) > 1e-12:
        _ok1u = False
    _S = quad(lambda x, a=_a: 3 * a * x - 2 * a * x, 0, 2 * _a, 20001)[0] + quad(
        lambda x, a=_a, f=_f: 3 * a * x - f(x), 2 * _a, 4 * _a, 20001
    )[0]
    if abs(_S - 16 * _a**3 / 3) > 1e-9:
        _ok1u = False
ok(
    "東北理24-1 A(a,3a²)、p=4a、q=2a、S=16a³/3、S=2/3 なら a=1/2",
    _ok1u and abs((2 / 3 * 3 / 16) ** (1 / 3) - 0.5) < 1e-12,
    "a=0.25,0.5,1,2 で頂点・交点・接点・面積をすべて照合",
)

random.seed(20240226)
_bad2u = 0
for _ in range(200000):
    _t = random.uniform(1.0001, 50)
    _L = math.log(_t)
    _x = random.uniform(0.001, 200)
    if _x > 1 / (math.sqrt(_t) - 1) and _x >= 2 * math.log(_x) / _L:
        if not (_x + 1 > 2 * math.log(_x + 1) / _L):
            _bad2u += 1
ok(
    "東北理24-2 (a)(b) ⟹ x+1>2log_t(x+1)、n≦2log₂n は n=2,3,4 だけ",
    _bad2u == 0 and [n for n in range(1, 200) if n <= 2 * math.log2(n) + 1e-12] == [2, 3, 4],
    f"(t,x) を20万組とって反例 {_bad2u} 件",
)


def _okstr(t):
    return "AAA" not in t and "BB" not in t


_pqr = {}
for _n in range(2, 9):
    _P = _Q = _R = Fraction(0)
    for _s in itertools.product("AB", repeat=_n):
        _st = "".join(_s)
        if not _okstr(_st):
            continue
        _pr = Fraction(2, 3) ** _st.count("A") * Fraction(1, 3) ** _st.count("B")
        if _st[-2:] == "AA":
            _P += _pr
        elif _st[-2:] == "BA":
            _Q += _pr
        if _st[-1] == "B":
            _R += _pr
    _pqr[_n] = (_P, _Q, _R)
_p3, _q3, _r3 = Fraction(4, 9), Fraction(2, 9), Fraction(2, 9)
_rec = {2: (_p3, _q3, _r3)}
for _n in range(2, 21):
    _p3, _q3, _r3 = Fraction(2, 3) * _q3, Fraction(2, 3) * _r3, Fraction(1, 3) * (_p3 + _q3)
    _rec[_n + 1] = (_p3, _q3, _r3)
_v3ok = True
for _n in range(2, 9):
    _P, _Q, _R = _pqr[_n]
    _v = complex(_P) + 1j * complex(_Q) - (1 + 1j) * complex(_R)
    if abs(_v - 2 / 3**_n * (-(1 + 1j)) ** (_n - 2)) > 1e-15:
        _v3ok = False
ok(
    "東北理24-3 漸化式、p+2q+2r = 2^n/3^{n-1}、p+iq-(1+i)r = 2{-(1+i)}^{n-2}/3^n、p=r ⟺ 4|n",
    all(_pqr[n] == _rec[n] for n in range(2, 9))
    and all(_pqr[n][0] + 2 * _pqr[n][1] + 2 * _pqr[n][2] == Fraction(2**n, 3 ** (n - 1)) for n in range(2, 9))
    and _v3ok
    and [n for n in range(2, 21) if _rec[n][0] == _rec[n][2]] == [4, 8, 12, 16, 20],
    "n=2〜8 を全列挙して漸化式・2つの1次結合を照合、p=r は n=4,8,12,16,20",
)

_P1 = (3.0, -1.0, 1.0)
_P2 = (5.0, 0.0, -1.0)
_d4 = math.dist(_P1, _P2)
_h4 = (_d4**2 + 5 - 2) / (2 * _d4)
_P3 = tuple(_P1[i] + (_h4 / _d4) * (_P2[i] - _P1[i]) for i in range(3))
_w4 = (4 / 9, 2 / 9, 5 / 9)
_wn4 = math.hypot(*_w4)
_Q4 = tuple(_P3[i] - _w4[i] / _wn4 for i in range(3))
ok(
    "東北理24-4 |P1P2|=3、交円は半径1・中心(13/3,-1/3,-1/3)、単位ベクトルは ±(√5/5,-2√5/5,0)、d の最大は (1+√5)/3",
    abs(_d4 - 3) < 1e-12
    and abs(_h4 - 2) < 1e-12
    and abs(math.sqrt(5 - _h4**2) - 1) < 1e-9
    and max(abs(_P3[i] - (13 / 3, -1 / 3, -1 / 3)[i]) for i in range(3)) < 1e-12
    and abs(math.dist(_Q4, _P1) - math.sqrt(5)) < 1e-9
    and abs(math.dist(_Q4, _P2) - math.sqrt(2)) < 1e-9
    and abs(abs(_Q4[2]) - (1 + math.sqrt(5)) / 3) < 1e-12,
    f"Q={tuple(round(c,9) for c in _Q4)}、|z|={abs(_Q4[2]):.9f} = (1+√5)/3={(1+math.sqrt(5))/3:.9f}",
)

_f5u = lambda x: math.log(2 * x - 3) / x
_g5u = lambda x: 2 * x - (2 * x - 3) * math.log(2 * x - 3)
_lo5, _hi5 = 2.0, 20.0
for _ in range(200):
    _m5 = (_lo5 + _hi5) / 2
    if _g5u(_m5) > 0:
        _lo5 = _m5
    else:
        _hi5 = _m5
_al5 = (_lo5 + _hi5) / 2
ok(
    "東北理24-5 g(x)=2x-(2x-3)log(2x-3)、α はただ1つ（3<α<5）、f(α)=2/(2α-3)、(m,n)=(3,6) のみ",
    _g5u(2) > 0
    and 3 < _al5 < 5
    and abs(_f5u(_al5) - 2 / (2 * _al5 - 3)) < 1e-12
    and 3**4 < 5**3
    and 5**5 > 7**4
    and [(m, n) for m in range(2, 60) for n in range(m + 1, 60) if (2 * m - 3) ** n == (2 * n - 3) ** m] == [(3, 6)],
    f"α={_al5:.9f}、f(α)={_f5u(_al5):.9f}、f(3)=f(6)={_f5u(3):.9f}",
)

_r6u = lambda th: math.sqrt(2) / (1 + math.cos(th))
_ok6u = True
for _th in (0.0, 0.5, 1.0, math.pi / 2, -math.pi / 2):
    _s6 = 1 / (1 + math.cos(_th))
    _R6 = (_s6 * math.cos(_th), _s6 * math.sin(_th), 1 - _s6)
    if abs(_R6[2] - _R6[0]) > 1e-12 or abs(math.dist((0, 0, 1), _R6) - _r6u(_th)) > 1e-12:
        _ok6u = False
_I6 = quad(lambda th: _r6u(th) ** 2, -math.pi / 2, math.pi / 2, 40001)[0]
_T6 = math.pi / math.sqrt(2) - _I6 / (2 * math.sqrt(2))
_S6 = lambda t: quad(lambda x: _r6u(x) ** 2, -math.pi / 2, t, 4001)[0] / (2 * math.sqrt(2))
_ineq6 = all(
    h * _r6u(th) ** 2 / (2 * math.sqrt(2)) <= _S6(th + h) - _S6(th) + 1e-9 <= h * _r6u(th + h) ** 2 / (2 * math.sqrt(2)) + 2e-9
    for th, h in [(0, 0.3), (0.2, 0.5), (0.5, 1.0), (1.0, 0.5), (0.0, math.pi / 2)]
)
ok(
    "東北理24-6 r(θ)=√2/(1+cosθ)、展開図ではさみうち、T = √2(3π-4)/6",
    _ok6u and _ineq6 and abs(_I6 - 8 / 3) < 1e-9 and abs(_T6 - math.sqrt(2) * (3 * math.pi - 4) / 6) < 1e-9,
    f"∫r²dθ={_I6:.10f}（8/3）、T={_T6:.10f} / √2(3π-4)/6={math.sqrt(2)*(3*math.pi-4)/6:.10f}",
)

# ---- 東北大学 理系 2023 ----

_draw = _aw = _bw = 0
for _pos in itertools.combinations(range(9), 4):
    _col = ["W"] * 9
    for _i in _pos:
        _col[_i] = "R"
    _res = "draw"
    for _i, _c in enumerate(_col):
        if _i % 2 == 0:
            if _c == "R":
                _res = "A"
                break
        else:
            if _c == "W":
                _res = "B"
                break
    if _res == "draw":
        _draw += 1
    elif _res == "A":
        _aw += 1
    else:
        _bw += 1
ok(
    "東北理23-1 引き分け 1/126、A の勝ち 38/63（B は 7/18）",
    Fraction(_draw, 126) == Fraction(1, 126) and Fraction(_aw, 126) == Fraction(38, 63) and _draw + _aw + _bw == 126,
    f"126通りの全列挙で 引き分け {_draw}、A {_aw}、B {_bw}",
)

_f2w = lambda x: math.sin(3 * x) + math.sin(x)
_p2 = lambda m: int(2 * m / math.pi)
ok(
    "東北理23-2 解は x=kπ/2（最小 π/2）、p(m)=[2m/π]、lim p(m)/m = 2/π",
    all(abs(_f2w(k * math.pi / 2)) < 1e-12 for k in range(1, 41))
    and all(abs(_f2w(x) - 2 * math.sin(2 * x) * math.cos(x)) < 1e-12 for x in (0.3, 1.1, 2.5, 4.2))
    and abs(_p2(100000) / 100000 - 2 / math.pi) < 1e-4,
    f"p(10)/10={_p2(10)/10}, p(1000)/1000={_p2(1000)/1000}, p(10^5)/10^5={_p2(100000)/100000}（2/π={2/math.pi:.7f}）",
)

_ok3w = True
for _s3 in (Fraction(3), Fraction(-1, 2), Fraction(0), Fraction(7, 3)):
    _a3 = _s3
    for _n in range(1, 9):
        if _a3 != 1 + 2 * (_s3 - 1) / Fraction(_n * (_n + 1)):
            _ok3w = False
        _a3 = (_n * _a3 + 2) / Fraction(_n + 2)
_sum3ok = True
for _m in range(1, 8):
    _s3 = Fraction(1 - _m, 2)
    _a3 = _s3
    _t3 = Fraction(0)
    for _n in range(1, _m + 1):
        _t3 += _a3
        _a3 = (_n * _a3 + 2) / Fraction(_n + 2)
    if _t3 != 0:
        _sum3ok = False
ok(
    "東北理23-3 a_n = 1 + 2(s-1)/(n(n+1))、Σ[n=1..m] a_n = 0 ⟺ s = (1-m)/2",
    _ok3w and _sum3ok,
    "s を4通り・m を 1〜7 で分数のまま照合",
)

_a4w = (math.sqrt(5) - 1) / 2
_b4w = -(1 + math.sqrt(5)) / 2
_al4 = cmath.exp(2j * math.pi / 5)
ok(
    "東北理23-4 x⁴+x³+x²+x+1=(x²-ax+1)(x²-bx+1)、α=cos72°+isin72°、α^2023+α^-2023 = -(1+√5)/2",
    all(
        abs((x**2 - _a4w * x + 1) * (x**2 - _b4w * x + 1) - (x**4 + x**3 + x**2 + x + 1)) < 1e-9
        for x in (-2.3, -0.7, 0.4, 1.9, 3.1)
    )
    and abs(_al4**2 - _a4w * _al4 + 1) < 1e-12
    and abs(_al4**2023 + _al4 ** (-2023) - (-(1 + math.sqrt(5)) / 2)) < 1e-9,
    f"α^2023+α^-2023={(_al4**2023 + _al4**(-2023)).real:.10f} / -(1+√5)/2={-(1+math.sqrt(5))/2:.10f}",
)

_A5 = (2.0, 0.0, 0.0)
_B5 = (1.5, 3 * math.sqrt(3) / 2, 0.0)
_c5y = 0.75 / (3 * math.sqrt(3) / 2)
_C5 = (1.5, _c5y, math.sqrt(6 - 1.5**2 - _c5y**2))
_dot5 = lambda u, v: sum(u[i] * v[i] for i in range(3))
_H5 = tuple(2 / 3 * _A5[i] + 1 / 9 * _B5[i] for i in range(3))
_K5 = tuple(2 / 3 * _A5[i] + 1 / 9 * _B5[i] + 2 / 9 * _C5[i] for i in range(3))
_HK5 = tuple(_K5[i] - _H5[i] for i in range(3))
ok(
    "東北理23-5 a·b=3、c·a=3、OH=(2/3)a+(1/9)b、OK=OH+(2/9)c（係数の和1）、HK=(2/9)c",
    abs(_dot5(_A5, _B5) - 3) < 1e-9
    and abs(_dot5(_C5, _A5) - 3) < 1e-9
    and abs(_dot5(_C5, _B5) - 3) < 1e-9
    and all(abs(_dot5(tuple(_C5[i] - _H5[i] for i in range(3)), v)) < 1e-9 for v in (_A5, _B5))
    and abs(_dot5(_K5, tuple(_B5[i] - _A5[i] for i in range(3)))) < 1e-9
    and abs(_dot5(_K5, tuple(_C5[i] - _A5[i] for i in range(3)))) < 1e-9
    and max(abs(_HK5[i] - 2 / 9 * _C5[i]) for i in range(3)) < 1e-9,
    "座標を組んで内積・垂線の足・平行性をすべて確認（HK は c の 2/9 倍）",
)

_f6w = lambda x: -x / 2 - 4 / (6 * x + 1)
_g6w = lambda x: _f6w(x) - x


def _Mm6(X):
    lo = max(0.0, X - 1)
    hi = min(2.0, X)
    xs = [lo, hi] + ([0.5] if lo <= 0.5 <= hi else [])
    vs = [_g6w(t) for t in xs]
    return max(vs), min(vs)


_area6 = 0.0
_N6 = 600000
for _i in range(_N6):
    _X = 3 * (_i + 0.5) / _N6
    _M6, _m6 = _Mm6(_X)
    _area6 += (_M6 - _m6) * 3 / _N6
ok(
    "東北理23-6 接線 y=x-7/4、S の上下の境界、面積 237/52 - (4/3)log2",
    abs(_f6w(0.5) - (0.5 - 7 / 4)) < 1e-12
    and abs(_g6w(1 / 6) - _g6w(7 / 6)) < 1e-12
    and abs(_g6w(1 / 6) + 9 / 4) < 1e-12
    and abs(_g6w(2) + 43 / 13) < 1e-12
    and abs(_area6 - (237 / 52 - 4 / 3 * math.log(2))) < 1e-6,
    f"区分求積 {_area6:.9f} / 237/52-(4/3)log2 = {237/52 - 4/3*math.log(2):.9f}",
)

# ---- 東北大学 理系 2022 ----


def _N22(K):
    return sum(
        1 for l in range(1, K, 2) for m in range(1, K, 2) if 1 <= K - l - m and (K - l - m) % 2 == 1
    )


_same22 = sum(
    1
    for l in range(1, 99, 2)
    for m in range(1, 99, 2)
    if 1 <= 99 - l - m and (99 - l - m) % 2 == 1 and len({l, m, 99 - l - m}) < 3
)
ok(
    "東北理22-1 N=(K²-1)/8、K=99 で N=1225・同じ奇数を2つ以上含むのは73、N>K の最小は K=9",
    all(_N22(K) == (K * K - 1) // 8 for K in (5, 7, 9, 11, 99))
    and _same22 == 73
    and min(k for k in range(5, 200, 2) if (k * k - 1) // 8 > k) == 9,
    f"N(99)={_N22(99)}、同じ奇数2つ以上={_same22}、4+√17={4+math.sqrt(17):.6f}",
)


def _f22(x, a):
    return (x * x + 3 * x + a) * (x + 1) ** 2


def _crit22(a):
    D = 73 - 32 * a
    rs = [-1.0]
    if D > 0:
        rs += [(-11 - math.sqrt(D)) / 8, (-11 + math.sqrt(D)) / 8]
    elif D == 0:
        rs += [-11 / 8]
    return sorted(set(round(r, 12) for r in rs))


_b22 = 0
for _i in range(-1000, 301):
    _a = _i / 100
    _cs = _crit22(_a)
    _gm = min(_f22(c, _a) for c in _cs)
    _b0 = min(c for c in _cs if abs(_f22(c, _a) - _gm) < 1e-12)
    _dec = all(_f22(x, _a) > _f22(x + 1e-4, _a) for x in [_b0 - 6 + 0.01 * j for j in range(600)])
    if _dec != (_a <= 9 / 4 + 1e-12 or _a >= 73 / 32 - 1e-12):
        _b22 += 1
_min22ok = all(
    (min(_f22(-6 + 0.0005 * j, a) for j in range(20000)) < -1e-12) == (a < 9 / 4 - 1e-9)
    for a in (2.2, 2.25, 2.3)
)
_pair22 = all(
    _f22((-11 - math.sqrt(73 - 32 * a)) / 8, a) < _f22((-11 + math.sqrt(73 - 32 * a)) / 8, a)
    for a in (-5, 0, 1, 1.5, 1.99)
)
ok(
    "東北理22-2 最小値<0 ⟺ a<9/4、f(α₁)<f(α₂)、x<β で減少かつ最小は a≦9/4 または a≧73/32",
    _min22ok and _pair22 and _b22 == 0,
    f"a を -10〜3 まで 0.01 刻みの1301点で照合して差異 {_b22} 件（9/4=2.25、73/32=2.28125）",
)

_b3v = sum(
    1
    for i in range(1, 200000)
    if not (i / 1000 / (2 + i / 1000) <= math.sqrt(1 + i / 1000) - 1 + 1e-15 <= i / 1000 / 2 + 1e-15)
)
_S22 = lambda n: sum(math.sqrt(1 + k / n**2) - 1 for k in range(1, n + 1))
ok(
    "東北理22-3 x/(2+x) ≦ √(1+x)-1 ≦ x/2、lim S_n = 1/4",
    _b3v == 0 and abs(_S22(100000) - 0.25) < 1e-5,
    f"不等式の反例 {_b3v} 件、S(10^5)={_S22(100000):.9f}",
)

_ok4v = True
for _m in (0.3, 1.0, 2.0, 5.0):
    _t = (math.sqrt(1 + _m * _m) - 1) / _m
    _ba = (math.sqrt(1 + _t * _t) + _t) ** 2
    _d = math.dist((1 / _t, 1.0), (_ba / _t, _ba))
    if abs(_t - math.tan(math.atan(_m) / 2)) > 1e-12 or abs(_d - (1 + _ba)) > 1e-9:
        _ok4v = False
_lim4v = (lambda m: ((math.sqrt(1 + ((math.sqrt(1 + m * m) - 1) / m) ** 2) + (math.sqrt(1 + m * m) - 1) / m) ** 2 - 1) / m)(1e-4)
ok(
    "東北理22-4 t=(√(1+m²)-1)/m、b/a=(√(1+t²)+t)²、lim (1/m)(b/a-1) = 1",
    _ok4v and abs(_lim4v - 1) < 1e-3,
    f"m を4通りで t と外接を照合、m=10⁻⁴ で (1/m)(b/a-1)={_lim4v:.9f}",
)

_s5v = 0.0
for _ in range(200):
    _t5v = (1 + 2 * _s5v) / 3
    _s5v = (2 * _t5v + 1) / 6
_A5v = [5 / 14 * c for c in (1, 2, 1)]
_B5v = [4 / 7 * c for c in (1, 1, -1)]
_B5v[2] += 1
_AB5v = [_B5v[i] - _A5v[i] for i in range(3)]
ok(
    "東北理22-5 s_{n+1}=(4s_n+5)/18、S=5/14、T=4/7、AB は ℓ,ℓ' の両方と直交",
    abs(_s5v - 5 / 14) < 1e-12
    and abs((1 + 2 * _s5v) / 3 - 4 / 7) < 1e-12
    and abs(sum(_AB5v[i] * (1, 2, 1)[i] for i in range(3))) < 1e-12
    and abs(sum(_AB5v[i] * (1, 1, -1)[i] for i in range(3))) < 1e-12,
    f"S={_s5v:.12f}（5/14）、AB={[round(14*c,9) for c in _AB5v]}/14 = (3,-2,1)/14",
)


def _V22(r):
    if r <= 1:
        return 2 / 3 * math.pi * r**3
    if r <= math.sqrt(3):
        return 2 * math.pi / 3 * (r**3 - (r * r - 1) ** 1.5)
    if r <= 2:
        return math.sqrt(3) * math.pi * (r * r - 1) - 2 * math.pi / 3 * (r * r - 1) ** 1.5
    return math.sqrt(3) * math.pi


ok(
    "東北理22-6 V(r) の4つの場合分け（r≧2 では円柱の体積 √3π）",
    all(
        abs(
            quad(lambda z, R=r: math.pi * min(1.0, max(0.0, R * R - z * z)), 0, min(math.sqrt(3), r), 20001)[0]
            - _V22(r)
        )
        < 1e-6
        for r in (0.5, 1.0, 1.3, math.sqrt(3), 1.8, 2.0, 2.5)
    ),
    f"7通りの r で断面積の数値積分と一致。√3π={math.sqrt(3)*math.pi:.9f}",
)

# ---- 東北大学 理系 2021 ----

_b1y = 0
for _i in range(-150, 301):
    for _j in range(-200, 201):
        _a1 = _i / 50
        _b1 = _j / 50
        if _a1 == 0:
            _has = _b1 != 0 and -1 / _b1 > 0
        else:
            _D1 = _b1 * _b1 - 4 * _a1
            _has = _D1 >= 0 and any(
                (-_b1 + sg * math.sqrt(_D1)) / (2 * _a1) > 0 for sg in (1, -1)
            )
        if (not _has) != (_a1 >= 0 and (_b1 >= 0 or _b1 * _b1 < 4 * _a1)):
            _b1y += 1
ok(
    "東北理21-1 正の解をもたない ⟺ a≧0 かつ（b≧0 または b²<4a）",
    _b1y == 0,
    f"(a,b) を 0.02 刻みの18万点で照合して差異 {_b1y} 件",
)

random.seed(20210225)
_b2y = 0
for _ in range(20000):
    _A2 = (random.uniform(-5, 5), random.uniform(-5, 5))
    _B2 = (random.uniform(-5, 5), random.uniform(-5, 5))
    _C2 = (random.uniform(-5, 5), random.uniform(-5, 5))
    _a2 = random.uniform(0.01, 0.99)
    _b2 = random.uniform(0.01, 0.99)
    _P2 = tuple((1 - _a2) * _A2[i] + _a2 * _B2[i] for i in range(2))
    _Q2 = tuple((1 - _b2) * _B2[i] + _b2 * _C2[i] for i in range(2))
    _R2 = tuple((_C2[i] + _A2[i]) / 2 for i in range(2))
    _cr = lambda X, Y, Z: abs((Y[0] - X[0]) * (Z[1] - X[1]) - (Y[1] - X[1]) * (Z[0] - X[0])) / 2
    _S2 = _cr(_A2, _B2, _C2)
    if _S2 < 1e-6:
        continue
    if abs(_cr(_P2, _Q2, _R2) / _S2 - (1 - _a2 - _b2 + 2 * _a2 * _b2) / 2) > 1e-9:
        _b2y += 1
_pq21 = [
    (p, q)
    for p in range(3, 200)
    for q in range(3, 200)
    if (2 * p * q) % (p * q - p - q + 2) == 0
]
ok(
    "東北理21-2 T/S=(1-a-b+2ab)/2、0<a,b<1/2 で 1/4<T/S<1/2、S/T が整数は (p,q)=(4,6),(6,4)",
    _b2y == 0 and sorted(_pq21) == [(4, 6), (6, 4)],
    f"面積比の反例 {_b2y} 件、整数になる (p,q)={sorted(_pq21)}（いずれも S/T=3）",
)

_pt21 = lambda k: (math.cos(math.pi * k / 4), math.sin(math.pi * k / 4))


def _right21(t):
    P = [_pt21(k) for k in t]
    for i in range(3):
        u = (P[(i + 1) % 3][0] - P[i][0], P[(i + 1) % 3][1] - P[i][1])
        w = (P[(i + 2) % 3][0] - P[i][0], P[(i + 2) % 3][1] - P[i][1])
        if abs(u[0] * w[0] + u[1] * w[1]) < 1e-9:
            return True
    return False


def _iso21(t):
    P = [_pt21(k) for k in t]
    d = sorted(round(math.dist(P[i], P[(i + 1) % 3]), 9) for i in range(3))
    return d[0] == d[1] or d[1] == d[2]


_tri21 = list(itertools.combinations(range(8), 3))
ok(
    "東北理21-3 直角三角形24個、どちらでもないもの16個、条件(*)の四角形54個",
    sum(1 for t in _tri21 if _right21(t)) == 24
    and sum(1 for t in _tri21 if not _right21(t) and not _iso21(t)) == 16
    and sum(
        1
        for q in itertools.combinations(range(8), 4)
        if any(_right21(t) for t in itertools.combinations(q, 3))
    )
    == 54,
    "56個の三角形・70個の四角形を全列挙して確認（二等辺24、両方8）",
)

_ok4y = True
for _a4 in (1.2, 1.5, 1.8):
    _k4 = _a4**3 - 3 * _a4
    _X4 = -_a4 / 2
    if abs((_a4**3 - 3.5 * _a4) - (-8 * _X4**3 + 7 * _X4)) > 1e-12:
        _ok4y = False
    _p4 = (-_a4 - math.sqrt(12 - 3 * _a4 * _a4)) / 2
    _q4 = (-_a4 + math.sqrt(12 - 3 * _a4 * _a4)) / 2
    if abs(_p4**3 - 3 * _p4 - _k4) > 1e-9 or abs(_q4**3 - 3 * _q4 - _k4) > 1e-9:
        _ok4y = False
_ar4 = quad(lambda a: 1.5 * (a * a - 1) * math.sqrt(12 - 3 * a * a), 1, 2, 100001)[0]
ok(
    "東北理21-4 S(-a/2, a³-7a/2)、軌跡 y=-8x³+7x（-1<x<-1/2）、通過領域の面積 27/8",
    _ok4y and abs(_ar4 - 27 / 8) < 1e-6,
    f"a を3通りで照合、面積の数値積分 {_ar4:.9f} / 27/8 = {27/8}",
)

random.seed(2021)
_b5y = 0
for _ in range(200000):
    _z5 = complex(random.uniform(-3, 3), random.uniform(-3, 3))
    if (abs((_z5.conjugate() * _z5 * _z5).imag) < 1e-12) != (abs(_z5.imag) < 1e-12):
        _b5y += 1


def _iso5(z):
    if abs(z.imag) < 1e-12:
        return False
    d = sorted([abs(z), abs(z * z), abs(z * z - z)])
    return abs(d[0] - d[1]) < 1e-9 or abs(d[1] - d[2]) < 1e-9


_best5 = None
for _i in range(1, 60001):
    _th5 = math.pi / 3 * _i / 60000
    for _r5 in (2 * math.cos(_th5), 1.0, 1 / (2 * math.cos(_th5))):
        _z5 = _r5 * cmath.exp(1j * _th5)
        if not _iso5(_z5):
            continue
        _ar5 = 0.5 * _r5**3 * math.sin(_th5)
        if _best5 is None or _ar5 > _best5[0]:
            _best5 = (_ar5, _z5)
ok(
    "東北理21-5 同一直線上 ⟺ z が実数、二等辺は |z|=1・|z-1|=1・Re z=1/2、面積の最大は 3√3/4（z=3/2+(√3/2)i）",
    _b5y == 0
    and all(_iso5(z) for z in (1j, 0.5 + 0.3j, 1 + 1j, 1.5 + math.sqrt(3) / 2 * 1j))
    and not _iso5(2 + 1j)
    and abs(_best5[0] - 3 * math.sqrt(3) / 4) < 1e-6
    and abs(_best5[1] - (1.5 + math.sqrt(3) / 2 * 1j)) < 1e-4,
    f"最大 {_best5[0]:.9f}（3√3/4={3*math.sqrt(3)/4:.9f}）、z={_best5[1]}",
)

_ok6y = True
for _a6 in (0.5, 1.0, 2.0):
    for _n6 in (1, 2, 5):
        _R6 = quad(lambda x, a=_a6, n=_n6: (a - x) ** n / math.factorial(n) * math.exp(x), 0, _a6, 20001)[0]
        _s6 = sum(_a6**k / math.factorial(k) for k in range(_n6 + 1))
        if abs(_s6 + _R6 - math.exp(_a6)) > 1e-9:
            _ok6y = False
        if not (
            _a6 ** (_n6 + 1) / math.factorial(_n6 + 1) <= _R6 + 1e-12
            <= math.exp(_a6) * _a6 ** (_n6 + 1) / math.factorial(_n6 + 1) + 1e-12
        ):
            _ok6y = False
_n6min = min(n for n in range(1, 20) if abs(math.e - sum(1 / math.factorial(k) for k in range(n + 1))) < 1e-3)
ok(
    "東北理21-6 e^a の展開と剰余項、剰余の上下の評価、|e-Σ|<10⁻³ の最小は n=6",
    _ok6y and _n6min == 6,
    f"(a,n) を9通りで等式と不等式を確認。n=5 で {abs(math.e - sum(1/math.factorial(k) for k in range(6))):.3e}、n=6 で {abs(math.e - sum(1/math.factorial(k) for k in range(7))):.3e}",
)

# --- 東北大学 2020年度（理系） -------------------------------------------------

_A20 = (0.0, 0.0)
_C20 = (1.0, 0.0)
_B20 = (7 / 8, math.sqrt(15) / 8)
_d20 = lambda p, q: math.hypot(p[0] - q[0], p[1] - q[1])
_best1z = (1e9, None)
_s1 = 1
while _s1 < 20000:
    _ss = _s1 / 20000
    _P = (7 / 8, math.sqrt(15) / 8 * (1 - _ss))
    _v = _d20(_A20, _P) ** 2 + _d20(_B20, _P) ** 2 + _d20(_C20, _P) ** 2
    if _v < _best1z[0]:
        _best1z = (_v, _ss)
    _s1 += 1
ok(
    "東北理20-1 cosθ=7/8、sinθ=√15/8、AP²+BP²+CP² の最小 15/16（s=2/3）",
    abs(_d20(_A20, _B20) - 1) < 1e-12
    and abs(_d20(_A20, _C20) - 1) < 1e-12
    and abs(_d20(_B20, _C20) - 0.5) < 1e-12
    and abs(_best1z[0] - 15 / 16) < 1e-9
    and abs(_best1z[1] - 2 / 3) < 1e-4,
    f"AB={_d20(_A20,_B20):.9f}、BC={_d20(_B20,_C20):.9f}、最小 {_best1z[0]:.9f} at s={_best1z[1]:.5f}",
)


def _cnt20(a, kind):
    """円 C と直線 L（kind=0）または M（kind=1）の共有点の個数。"""
    d = (3 * abs(a - 2) / 5) if kind == 0 else (4 * abs(a - 2) / 5)
    r = abs(a)
    if d < r - 1e-12:
        return 2
    if d > r + 1e-12:
        return 0
    return 1


def _union20(a):
    """和集合の要素数。重なるのは L と M の交点 (a,a) が C 上にあるとき（a=1）だけ。"""
    n = _cnt20(a, 0) + _cnt20(a, 1)
    if abs(((a - a) ** 2 + (a - 2) ** 2) - a * a) < 1e-12:
        n -= 1
    return n


_hits20 = sorted(
    {round(a, 6) for a in (-8.0, 8 / 9, 1.0) if _union20(a) == 3}
)
_scan20 = []
_k20 = -40000
while _k20 <= 40000:
    _a20 = _k20 / 4000
    if _a20 != 0 and _union20(_a20) == 3:
        _scan20.append(round(_a20, 6))
    _k20 += 1
ok(
    "東北理20-2 a=1 で交点が C 上、|C∩L|=2 ⟺ a<-3 または a>3/4、和集合3個は a=-8, 8/9, 1",
    abs(1 - 2) ** 2 == 1
    and _cnt20(-3.0, 0) == 1
    and _cnt20(0.75, 0) == 1
    and _cnt20(-4.0, 0) == 2
    and _cnt20(1.0, 0) == 2
    and _cnt20(0.5, 0) == 0
    and _cnt20(-8.0, 1) == 1
    and _cnt20(8 / 9, 1) == 1
    and _hits20 == [-8.0, round(8 / 9, 6), 1.0]
    and set(_scan20) <= {-8.0, round(8 / 9, 6), 1.0}
    and -8.0 in _scan20
    and 1.0 in _scan20,
    f"a=-8, 8/9, 1 で和集合 {_union20(-8.0)}, {_union20(8/9)}, {_union20(1.0)} 個。0.00025 刻みの走査で見つかったのは {sorted(set(_scan20))}（8/9 は刻みに乗らない）",
)

_ge20 = [n for n in range(1, 12) if 2**n + n * n + 8 >= 3**n]
_D20 = lambda n: 2**n + n * n + 8 - 3**n
_tri20 = [
    (a, b, n)
    for n in range(1, 12)
    for a in range(0, 30)
    for b in range(0, 30)
    if _D20(n) == a * n + b
]
ok(
    "東北理20-3 2ⁿ+n²+8≧3ⁿ は n=1,2 のみ、D(1)=8・D(2)=7 で (a,b,n) は13組",
    all(2**n + n * n + 8 < 3**n for n in range(3, 12))
    and _ge20 == [1, 2]
    and _D20(1) == 8
    and _D20(2) == 7
    and len(_tri20) == 13
    and sorted({n for _, _, n in _tri20}) == [1, 2],
    f"差 3ⁿ-(2ⁿ+n²+8) は n=3..8 で {[3**n-(2**n+n*n+8) for n in range(3,9)]}、組は {len(_tri20)} 個",
)

# 箱 (白, 赤) と手元 (白, 赤) の状態を分数のまま遷移させる。
_st20 = {((3, 2), (0, 0)): Fraction(1)}
_stop20 = {}
for _t20 in range(1, 16):
    _nx20 = {}
    for (_box, _hand), _pr in _st20.items():
        _w, _r = _box
        _tot = _w + _r
        for _pick, _pp in ((0, Fraction(_w, _tot)), (1, Fraction(_r, _tot))):
            if _pp == 0:
                continue
            # 裏（確率 1/2）: 戻すので状態は変わらない
            _nx20[(_box, _hand)] = _nx20.get((_box, _hand), Fraction(0)) + _pr * _pp / 2
            # 表（確率 1/2）: 手元に残す
            if _pick == 0:
                _nb, _nh = (_w - 1, _r), (_hand[0] + 1, _hand[1])
            else:
                _nb, _nh = (_w, _r - 1), (_hand[0], _hand[1] + 1)
            _q = _pr * _pp / 2
            if _nb == (0, 0):
                _stop20[_t20] = _stop20.get(_t20, Fraction(0)) + _q
            else:
                _nx20[(_nb, _nh)] = _nx20.get((_nb, _nh), Fraction(0)) + _q
    _st20 = _nx20
    if _t20 == 2:
        _p2w20 = sum(_pr for (_b, _h), _pr in _st20.items() if _h == (2, 0))
    if _t20 == 3:
        _p11_20 = sum(_pr for (_b, _h), _pr in _st20.items() if _h == (1, 1))
_fml20 = lambda n: Fraction(math.comb(n - 1, 4), 2**n)
_max20 = max(_stop20, key=lambda n: (_stop20[n], -n))
_argmax20 = sorted(n for n in _stop20 if _stop20[n] == _stop20[_max20])
ok(
    "東北理20-4 2回後に白2個は3/40、3回後に白1赤1は9/40、pₙ=₍n-1₎C₄/2ⁿ、最大は n=8,9",
    _p2w20 == Fraction(3, 40)
    and _p11_20 == Fraction(9, 40)
    and all(_stop20[n] == _fml20(n) for n in range(5, 16))
    and _argmax20 == [8, 9]
    and _stop20[8] == Fraction(35, 256),
    f"3/40={_p2w20}、9/40={_p11_20}、p5..p10={[str(_stop20[n]) for n in range(5,11)]}、最大 {_stop20[8]} at n={_argmax20}",
)

_z20 = lambda t: -1 / (t + 1j)
_ts20 = (-1.0, -0.5, 0.0, 0.5, 1.0, 3.0)
ok(
    "東北理20-5 Re z=-t/(t²+1)、Im z=1/(t²+1)、|z-i/2|=1/2、-1≦t≦1 では上半円（両端込み）",
    all(abs(_z20(t).real + t / (t * t + 1)) < 1e-12 for t in _ts20)
    and all(abs(_z20(t).imag - 1 / (t * t + 1)) < 1e-12 for t in _ts20)
    and all(abs(abs(_z20(t) - 0.5j) - 0.5) < 1e-12 for t in _ts20)
    and abs(_z20(-1) - (0.5 + 0.5j)) < 1e-12
    and abs(_z20(0) - 1j) < 1e-12
    and abs(_z20(1) - (-0.5 + 0.5j)) < 1e-12
    and all(_z20(k / 1000).imag >= 0.5 - 1e-12 for k in range(-1000, 1001)),
    f"|z-i/2| は {[round(abs(_z20(t)-0.5j),9) for t in _ts20]}、t=-1,0,1 で z={_z20(-1):.3f}, {_z20(0):.3f}, {_z20(1):.3f}",
)

_A20f = lambda m, n: quad(lambda x: math.cos(x) ** m * math.sin(x) ** n, 0, math.pi / 2, 20001)[0]
_pairs20 = ((1, 1), (2, 3), (3, 2), (4, 1), (5, 4), (2, 2))
_sym20 = all(abs(_A20f(m, n) - _A20f(n, m)) < 1e-9 for m, n in _pairs20)
_rec20 = all(abs(_A20f(m + 2, n) + _A20f(m, n + 2) - _A20f(m, n)) < 1e-9 for m, n in _pairs20)
_m1_20 = all(abs(_A20f(m, 1) - 1 / (m + 1)) < 1e-9 for m in (1, 2, 3, 5))
_pt20 = all(
    abs(_A20f(m, n + 2) - (n + 1) / (m + 1) * _A20f(m + 2, n)) < 1e-9 for m, n in _pairs20
)
ok(
    "東北理20-6 A(m,n)=A(n,m)、A(m+2,n)+A(m,n+2)=A(m,n)、A(m,1)=1/(m+1)、A(m,n+2)=(n+1)/(m+1)·A(m+2,n)",
    _sym20 and _rec20 and _m1_20 and _pt20 and abs(_A20f(2, 2) - math.pi / 16) < 1e-9,
    f"6通りで対称性・漸化式・部分積分の関係を確認。A(2,3)={_A20f(2,3):.9f}（2/15={2/15:.9f}）、A(2,2)={_A20f(2,2):.9f}（π/16={math.pi/16:.9f}）",
)

# --- 東北大学 2019年度（理系） -------------------------------------------------

_y19 = []
_ok1x = True
for _m19 in range(-2, 3):
    for _n19 in range(-2, 3):
        _a19, _b19 = 2 * _m19 * math.pi, (2 * _n19 + 1) * math.pi
        _x19 = (2 * _m19 + 2 * _n19 + 1) * math.pi / 2
        _yy = _x19 - 2 * _m19 * math.pi
        if abs(math.cos(_a19) * math.cos(_b19) + 1) > 1e-12:
            _ok1x = False
        if abs(math.sin(_a19) + math.cos(_a19) * (_x19 - _a19) - _yy) > 1e-9:
            _ok1x = False
        if abs(math.sin(_b19) + math.cos(_b19) * (_x19 - _b19) - _yy) > 1e-9:
            _ok1x = False
        _y19.append(_yy / math.pi)
ok(
    "東北理19-1 直交する2接線の交点の y 座標は π/2 + kπ",
    _ok1x
    and all(abs(2 * v - round(2 * v)) < 1e-9 and round(2 * v) % 2 != 0 for v in _y19)
    and abs(min(_y19) + 3.5) < 1e-9
    and abs(max(_y19) - 4.5) < 1e-9,
    f"y/π の値は {sorted({round(v,6) for v in _y19})}（すべて奇数の半分）",
)


def _sat19(a, n, x):
    if not (x - n > 0 and 2 * n - x > 0):
        return False
    return math.log(x - n, a) > 0.5 * math.log(2 * n - x, a)


_big19 = [sorted(x for x in range(1, 20) if _sat19(a, 6, x)) for a in (2.0, 10.0, 1.5)]
_small19 = [sorted(x for x in range(1, 20) if _sat19(a, 6, x)) for a in (0.5, 0.1, 0.9)]
_exist19 = {
    a: [n for n in range(1, 25) if any(_sat19(a, n, x) for x in range(1, 3 * n))]
    for a in (2.0, 0.5)
}
ok(
    "東北理19-2 n=6 の整数解は a>1 で 9,10,11、0<a<1 で 7。整数解が存在する条件は n≧3",
    all(v == [9, 10, 11] for v in _big19)
    and all(v == [7] for v in _small19)
    and all(v == list(range(3, 25)) for v in _exist19.values()),
    f"a>1 で {_big19[0]}、0<a<1 で {_small19[0]}。存在する n は a=2 で {_exist19[2.0][:5]}…、a=0.5 で {_exist19[0.5][:5]}…",
)

_div19 = []
for _a3 in (0.1, 0.5, 2.0):
    _x3 = _a3
    for _ in range(60):
        _x3 = _x3 + _x3 * _x3
        if _x3 > 1e300:
            break
    _div19.append(_x3 > 1e300)
_ok3a = True
_ok3b = True
_last19 = None
for _a3 in (-0.9, -0.5, -0.1, -0.999):
    _x3 = _a3
    _prev = _x3
    for _ in range(30000):
        _x3 = _x3 + _x3 * _x3
        if not (-1 < _x3 < 0):
            _ok3a = False
        if _x3 < _prev - 1e-18:
            _ok3b = False
        _prev = _x3
    _last19 = _x3
ok(
    "東北理19-3 a>0 で発散、-1<a<0 では常に -1<xₙ<0 で単調増加、極限は 0",
    all(_div19) and _ok3a and _ok3b and abs(_last19) < 1e-4,
    f"a>0 の3通りは60回で 10³⁰⁰ 超え。-1<a<0 の4通りは3万回まで -1<xₙ<0 と単調増加を保ち、最後は {_last19:.3e}",
)


def _rem19(c):
    """係数リスト（低次から）を x²+1 で割った余り [c0, c1]。"""
    c = list(c)
    while len(c) > 2:
        d = c.pop()
        c[len(c) - 2] -= d
    while len(c) < 2:
        c.append(0)
    return [c[0], c[1]]


def _mul19(p, q):
    r = [0] * (len(p) + len(q) - 1)
    for i, pi in enumerate(p):
        for j, qj in enumerate(q):
            r[i + j] += pi * qj
    return r


random.seed(20190225)
_ok4b = True
for _ in range(200):
    _A4 = [random.randint(-4, 4) for _ in range(random.randint(1, 6))]
    _B4 = [random.randint(-4, 4) for _ in range(random.randint(1, 6))]
    if _rem19(_mul19(_A4, _B4)) != _rem19(_mul19(_rem19(_A4), _rem19(_B4))):
        _ok4b = False
_ok4c = True
for _k4 in range(20):
    _th = _k4 * 0.37
    _r4 = _rem19(_mul19([math.cos(_th), math.sin(_th)], [math.cos(_th), math.sin(_th)]))
    if abs(_r4[0] - math.cos(2 * _th)) > 1e-12 or abs(_r4[1] - math.sin(2 * _th)) > 1e-12:
        _ok4c = False
_ok4d = True
for _sa in (1, -1):
    for _sb in (1, -1):
        _p4 = [_sb / math.sqrt(2), _sa / math.sqrt(2)]
        _r4 = _rem19(_mul19(_mul19(_p4, _p4), _mul19(_p4, _p4)))
        if abs(_r4[0] + 1) > 1e-12 or abs(_r4[1]) > 1e-12:
            _ok4d = False
ok(
    "東北理19-4 [2x²+x+3]=x+1、[x⁵-1]=x-1、3つめは -2。[AB]=[[A][B]]、[(x sinθ+cosθ)²]=x sin2θ+cos2θ、(4) は (±1/√2, ±1/√2)",
    _rem19([3, 1, 2]) == [1, 1]
    and _rem19([-1, 0, 0, 0, 0, 1]) == [-1, 1]
    and _rem19(_mul19(_rem19([3, 1, 2]), _rem19([-1, 0, 0, 0, 0, 1]))) == [-2, 0]
    and _ok4b
    and _ok4c
    and _ok4d,
    "(1) は x+1, x-1, -2。(2) は乱数200組、(3) は θ を20通り、(4) は4組すべてで確認",
)

_I19 = quad(lambda x: math.sin(math.pi * x) ** 2 / (1 + math.exp(x)), -1, 1, 20001)[0]
_J19 = quad(lambda x: math.sin(math.pi * x) ** 2, 0, 1, 20001)[0]
_A5 = 1 / (2 * (math.e - 1 / math.e - 2))
_B5 = _A5 + 0.5


def _f19(x):
    return (math.sin(math.pi * x) ** 2 + _A5 * math.exp(x) - 0.5) / (1 + math.exp(x))


_Ac19 = quad(_f19, -1, 1, 20001)[0]
_Bc19 = quad(lambda x: math.exp(x) * _f19(x), -1, 1, 20001)[0]
_eq19 = all(
    abs((1 + math.exp(x)) * _f19(x) - (math.sin(math.pi * x) ** 2 + math.exp(x) * _Ac19 - _Bc19 + _Ac19))
    < 1e-7
    for x in (-0.8, -0.3, 0.0, 0.4, 0.9)
)
ok(
    "東北理19-5 ∫sin²(πx)/(1+eˣ)dx=1/2、f(x)={sin²(πx)-1/2+eˣ/(2(e-e⁻¹-2))}/(1+eˣ)",
    abs(_I19 - 0.5) < 1e-7
    and abs(_J19 - 0.5) < 1e-7
    and abs(_Ac19 - _A5) < 1e-6
    and abs(_Bc19 - _B5) < 1e-6
    and abs(_A5 - math.e / (2 * (math.e**2 - 2 * math.e - 1))) < 1e-12
    and _eq19,
    f"積分は {_I19:.9f} と {_J19:.9f}。A={_A5:.9f}（実測 {_Ac19:.9f}）、B={_B5:.9f}（実測 {_Bc19:.9f}）。元の等式も5点で一致",
)


def _dist19(m):
    st = {0: Fraction(1)}
    for _ in range(m):
        nx = {}
        for j, pr in st.items():
            red = 5 - j
            if red > 0:
                nx[j + 1] = nx.get(j + 1, Fraction(0)) + pr * Fraction(red, 10)
            nx[j] = nx.get(j, Fraction(0)) + pr * Fraction(10 - red, 10)
        st = nx
    return st


_P19 = {m: _dist19(m) for m in range(0, 13)}
_p19 = lambda m, k: _P19[m].get(k, Fraction(0))
_f1_19 = lambda n: 5 * Fraction(3, 5) ** n - 5 * Fraction(1, 2) ** n
_f2_19 = lambda n: 10 * Fraction(7, 10) ** n - 20 * Fraction(3, 5) ** n + 10 * Fraction(1, 2) ** n
ok(
    "東北理19-6 p(n+1,2)=7/10·p(n,2)+2/5·p(n,1)、p(n,1)=5(3/5)ⁿ-5(1/2)ⁿ、p(n,2)=10(7/10)ⁿ-20(3/5)ⁿ+10(1/2)ⁿ",
    all(_p19(n + 1, 2) == Fraction(7, 10) * _p19(n, 2) + Fraction(2, 5) * _p19(n, 1) for n in range(2, 12))
    and all(_p19(n, 1) == _f1_19(n) for n in range(1, 13))
    and all(_p19(n, 2) == _f2_19(n) for n in range(1, 13)),
    f"p(n,1) n=1..5 は {[str(_p19(n,1)) for n in range(1,6)]}、p(n,2) n=1..5 は {[str(_p19(n,2)) for n in range(1,6)]}",
)

# --- 東北大学 2025年度（文系） -------------------------------------------------
# 第1問・第2問は理系と同じ問題なので、確認も理系の側（東北理25-1、東北理25-2）で済ませている。


def _shoe(pts):
    t = 0
    for i in range(len(pts)):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % len(pts)]
        t += x1 * y2 - x2 * y1
    return abs(t) / 2


_quad25 = _shoe([(0, 0), (1, 0), (3, 2), (0, 1)])
_tri25 = _shoe([(0, 0), (1, 0), (0, 1)])
_Av25 = (1.0, 0.0, 0.0)
_Bv25 = (0.5, math.sqrt(3) / 2, 0.0)
_Cv25 = (0.5, math.sqrt(3) / 6, math.sqrt(6) / 3)
_Dv25 = tuple(-4 * _Av25[i] + 3 * _Bv25[i] + 2 * _Cv25[i] for i in range(3))


def _vol25(p, q, r):
    return (
        abs(
            p[0] * (q[1] * r[2] - q[2] * r[1])
            - p[1] * (q[0] * r[2] - q[2] * r[0])
            + p[2] * (q[0] * r[1] - q[1] * r[0])
        )
        / 6
    )


_V25 = _vol25(_Av25, _Bv25, _Cv25)
_VP25 = _vol25(_Av25, _Bv25, _Dv25) + _vol25(_Av25, _Dv25, _Cv25)
random.seed(20250225)
_okOD25 = True
_okP25 = True
for _ in range(200):
    _a25 = [random.uniform(-3, 3) for _ in range(3)]
    _b25 = [random.uniform(-3, 3) for _ in range(3)]
    _c25 = [random.uniform(-3, 3) for _ in range(3)]
    _dd = [_a25[i] + 3 * (_b25[i] - _a25[i]) + 2 * (_c25[i] - _a25[i]) for i in range(3)]
    if max(abs(_dd[i] - (-4 * _a25[i] + 3 * _b25[i] + 2 * _c25[i])) for i in range(3)) > 1e-9:
        _okOD25 = False
    _p1 = [_a25[i] + 0.2 * (_dd[i] - _a25[i]) for i in range(3)]
    _p2 = [_b25[i] + 0.4 * (_c25[i] - _b25[i]) for i in range(3)]
    _p3 = [0.6 * _b25[i] + 0.4 * _c25[i] for i in range(3)]
    if max(abs(_p1[i] - _p2[i]) for i in range(3)) > 1e-9:
        _okP25 = False
    if max(abs(_p1[i] - _p3[i]) for i in range(3)) > 1e-9:
        _okP25 = False
ok(
    "東北文25-3 四角錐 OABDC は 5V、OD = -4a+3b+2c、OP = (3/5)b+(2/5)c、正四面体で OD = √15",
    _quad25 == 2.5
    and _tri25 == 0.5
    and abs(_VP25 / _V25 - 5) < 1e-9
    and _okOD25
    and _okP25
    and abs(math.dist((0, 0, 0), _Dv25) - math.sqrt(15)) < 1e-9,
    f"平面内の面積は四角形 {_quad25}・三角形 {_tri25}（比 {_quad25/_tri25:.0f}）、体積比 {_VP25/_V25:.9f}、|OD| = {math.dist((0,0,0), _Dv25):.9f}（√15 = {math.sqrt(15):.9f}）",
)

_k25 = 3 * math.sqrt(2) - 4
_al25 = (4 + _k25 - math.sqrt((4 + _k25) ** 2 - 16)) / 2
_be25 = (4 + _k25 + math.sqrt((4 + _k25) ** 2 - 16)) / 2
_h25 = lambda x: x * (x - 2) ** 2 - _k25 * x * x
_S1_25 = quad(_h25, 0, _al25, 20001)[0]
_S2_25 = -quad(_h25, _al25, _be25, 20001)[0]
ok(
    "東北文25-4 k = 3√2 - 4 で交点は 0, √2, 2√2、2つの部分の面積はどちらも 1",
    _k25 > 0
    and abs(_al25 - math.sqrt(2)) < 1e-9
    and abs(_be25 - 2 * math.sqrt(2)) < 1e-9
    and abs(_S1_25 - _S2_25) < 1e-9
    and abs(_S1_25 - 1) < 1e-9,
    f"k = {_k25:.9f}、α = {_al25:.9f}、β = {_be25:.9f}、S₁ = {_S1_25:.9f}、S₂ = {_S2_25:.9f}",
)

# --- 東北大学 2024年度（文系） -------------------------------------------------
# 第1問・第3問は理系と同じ問題なので、確認も理系の側（東北理24-1、東北理24-2）で済ませている。

_d24 = math.sqrt(3)
_a24 = 3 + 2 * math.sqrt(3)
_b24 = 2 * math.sqrt(3) - 3
_O24, _A24p, _B24p, _D24p = (0.0, 0.0), (_a24, 0.0), (_b24, 0.0), (0.0, _d24)


def _ang24(P, Q, R):
    u = (Q[0] - P[0], Q[1] - P[1])
    v = (R[0] - P[0], R[1] - P[1])
    c = (u[0] * v[0] + u[1] * v[1]) / (math.hypot(*u) * math.hypot(*v))
    return math.degrees(math.acos(max(-1.0, min(1.0, c))))


def _foot24(X, Y):
    dx, dy = Y[0] - X[0], Y[1] - X[1]
    t = -((X[0] * dx + X[1] * dy) / (dx * dx + dy * dy))
    return (X[0] + t * dx, X[1] + t * dy)


_P24 = _foot24(_A24p, _D24p)
_Q24 = _foot24(_B24p, _D24p)
_cen24, _r24 = (0.0, _d24 / 2), _d24 / 2
_AP24 = math.dist(_A24p, _P24)
_BQ24 = math.dist(_B24p, _Q24)
ok(
    "東北文24-2 tan75°=2+√3、a=3+2√3・b=2√3-3・d=√3、AP·AD=AO²・BQ·BD=BO²、AP·BQ=3/4",
    abs(math.tan(math.radians(75)) - (2 + math.sqrt(3))) < 1e-12
    and abs(_ang24(_A24p, _O24, _D24p) - 15) < 1e-9
    and abs(_ang24(_B24p, _O24, _D24p) - 75) < 1e-9
    and abs(_a24 - _b24 - 6) < 1e-12
    and abs(math.dist(_P24, _cen24) - _r24) < 1e-12
    and abs(math.dist(_Q24, _cen24) - _r24) < 1e-12
    and abs(_AP24 * math.dist(_A24p, _D24p) - math.dist(_A24p, _O24) ** 2) < 1e-9
    and abs(_BQ24 * math.dist(_B24p, _D24p) - math.dist(_B24p, _O24) ** 2) < 1e-9
    and abs(_AP24 * _BQ24 - 0.75) < 1e-9,
    f"∠OAD={_ang24(_A24p,_O24,_D24p):.9f}°、∠OBD={_ang24(_B24p,_O24,_D24p):.9f}°、AB={_a24-_b24:.9f}、AP·BQ={_AP24*_BQ24:.9f}",
)

_an24 = [None, 1]
_bn24 = [None, 1]
for _n24 in range(1, 15):
    _an24.append(_an24[_n24] + 2 * _bn24[_n24])
    _bn24.append(_an24[_n24] + _bn24[_n24])
_s2 = math.sqrt(2)
_pq24 = [
    (p, q) for p in range(0, 101) for q in range(0, 101) if p * _bn24[6] - q * _bn24[5] == 1
]
ok(
    "東北文24-4 aₙ₊₁=aₙ+2bₙ・bₙ₊₁=aₙ+bₙ、b₄,b₅,b₆=12,29,70、(1-√2)ⁿ=aₙ-bₙ√2、bₙ₊₁bₙ₋₁-bₙ²=(-1)ⁿ、(p,q)=(17,41)",
    all(abs((1 + _s2) ** n - (_an24[n] + _bn24[n] * _s2)) < 1e-6 * (1 + _s2) ** n for n in range(1, 15))
    and all(abs((1 - _s2) ** n - (_an24[n] - _bn24[n] * _s2)) < 1e-9 for n in range(1, 15))
    and (_bn24[4], _bn24[5], _bn24[6]) == (12, 29, 70)
    and all(_bn24[n + 1] * _bn24[n - 1] - _bn24[n] ** 2 == (-1) ** n for n in range(2, 14))
    and _pq24 == [(17, 41)],
    f"bₙ n=1..8 は {_bn24[1:9]}、bₙ₊₁bₙ₋₁-bₙ² は n=2..8 で {[_bn24[n+1]*_bn24[n-1]-_bn24[n]**2 for n in range(2,9)]}、70p-29q=1 の解は {_pq24}",
)

# --- 東北大学 2023年度（文系） -------------------------------------------------
# 第1問は理系と同じ問題なので、確認も理系の側（東北理23-1）で済ませている。

_LM23 = math.sqrt(15)
_M23 = (0.25, math.sqrt(15) / 4)
_N23 = (0.25, -math.sqrt(15) / 4)
_L23 = (4.0, 0.0)
_MN23 = math.dist(_M23, _N23)
_S23 = abs((_M23[0] - 4) * (_N23[1]) - (_M23[1]) * (_N23[0] - 4)) / 2
_s23 = (2 * math.dist(_L23, _M23) + _MN23) / 2
ok(
    "東北文23-2 △LMN の面積は 15√15/16、内接円 r=3/4、外接円 R=2",
    abs(math.hypot(*_M23) - 1) < 1e-12
    and abs((_M23[0] - 4) * _M23[0] + _M23[1] * _M23[1]) < 1e-12
    and abs(math.dist(_L23, _M23) - _LM23) < 1e-12
    and abs(_MN23 - math.sqrt(15) / 2) < 1e-12
    and abs(_S23 - 15 * math.sqrt(15) / 16) < 1e-9
    and abs(_S23 / _s23 - 0.75) < 1e-9
    and abs(math.dist(_L23, _M23) ** 2 * _MN23 / (4 * _S23) - 2) < 1e-9,
    f"LM={math.dist(_L23,_M23):.9f}、MN={_MN23:.9f}、面積={_S23:.9f}（15√15/16={15*math.sqrt(15)/16:.9f}）、r={_S23/_s23:.9f}、R={math.dist(_L23,_M23)**2*_MN23/(4*_S23):.9f}",
)


def _M23f(a):
    return 3 * a * a - 3 if a <= -0.75 else 3 * a * a + 12 * a + 6


def _m23f(a):
    if a > 0:
        return 3 * a * a - 3
    if a >= -1.5:
        return -a * a - 3
    return 3 * a * a + 12 * a + 6


_okM23 = True
_okm23 = True
for _i23 in range(-100, 101):
    _a23 = _i23 / 12.5
    _vs23 = [(_a23 + 3 * j / 800) ** 2 + 2 * _a23 * (_a23 + 3 * j / 800) - 3 for j in range(801)]
    if abs(max(_vs23) - _M23f(_a23)) > 1e-5:
        _okM23 = False
    if abs(min(_vs23) - _m23f(_a23)) > 1e-5:
        _okm23 = False
_best23 = min((_m23f(i / 2000), i / 2000) for i in range(-10000, 10001))
ok(
    "東北文23-3 M(a)・m(a) の場合分けが合い、m(a) の最小は a=-2 での -6",
    _okM23 and _okm23 and abs(_best23[0] + 6) < 1e-9 and abs(_best23[1] + 2) < 1e-6,
    f"a を 0.08 刻みで 201 通り、各区間を800分割して照合。m(a) の最小 {_best23[0]:.9f} at a={_best23[1]}",
)


def _sweep23(f, lo=0.0, hi=2.0, N=1200, M=1200):
    """(X, c) = (x, y-x) 座標で、高さ c ごとの区間の和集合の長さを積分する。"""
    g = [f(lo + (hi - lo) * i / N) - (lo + (hi - lo) * i / N) for i in range(N + 1)]
    cmin, cmax = min(g), max(g)
    dc = (cmax - cmin) / M
    total = 0.0
    for j in range(M):
        c = cmin + (j + 0.5) * dc
        iv = []
        for i in range(N):
            a1, a2 = g[i] - c, g[i + 1] - c
            if a1 == 0 or a1 * a2 < 0:
                x1 = lo + (hi - lo) * i / N
                x2 = lo + (hi - lo) * (i + 1) / N
                x = x1 + (x2 - x1) * abs(a1) / (abs(a1) + abs(a2))
                iv.append((x, x + 1))
        if not iv:
            continue
        iv.sort()
        cs, ce = iv[0]
        L = 0.0
        for s2, e2 in iv[1:]:
            if s2 > ce:
                L += ce - cs
                cs, ce = s2, e2
            else:
                ce = max(ce, e2)
        L += ce - cs
        total += L * dc
    return total


_S1_23 = _sweep23(lambda x: -2 * abs(x - 1) + 2)
_S3_23 = _sweep23(lambda x: 0.5 * (x - 1) ** 2)
ok(
    "東北文23-4 折れ線のとき S=29/8、接線は y=x-3/2、放物線のとき S=2",
    abs(_S1_23 - 29 / 8) < 2e-3
    and abs(_S3_23 - 2) < 2e-3
    and abs((2 - 1) - 1) < 1e-12
    and abs(0.5 * (2 - 1) ** 2 - 0.5) < 1e-12,
    f"(1) S={_S1_23:.6f}（29/8={29/8}、∫|f'-1|=4 とは違う）、(3) S={_S3_23:.6f}（2）",
)

# --- 東北大学 2022年度（文系） -------------------------------------------------
# 第1問は理系と同じ問題なので、確認も理系の側（東北理22-1）で済ませている。

_F22 = lambda t: quad(lambda x: abs(x * x - t * t), 0, 1, 20001)[0]
_Fa22 = lambda t: 4 * t**3 / 3 - t * t + 1 / 3
_Fb22 = lambda t: t * t - 1 / 3
_best22 = min(
    ((_Fa22(i / 20000) if i <= 20000 else _Fb22(i / 20000)), i / 20000) for i in range(0, 60001)
)
ok(
    "東北文22-2 0≦t≦1 で F(t)=4t³/3-t²+1/3、t≧1 で t²-1/3、最小は T=1/2 での 1/4",
    all(abs(_F22(t) - _Fa22(t)) < 1e-7 for t in (0.0, 0.2, 0.5, 0.8, 1.0))
    and all(abs(_F22(t) - _Fb22(t)) < 1e-7 for t in (1.0, 1.5, 2.0))
    and abs(_best22[0] - 0.25) < 1e-9
    and abs(_best22[1] - 0.5) < 1e-4,
    f"t=0.2 で数値 {_F22(0.2):.9f}／式 {_Fa22(0.2):.9f}、t=1.5 で {_F22(1.5):.9f}／{_Fb22(1.5):.9f}。最小 {_best22[0]:.9f} at t={_best22[1]}",
)


def _inD22(a, b):
    if a <= 0 or b <= 0:
        return False
    if 2 / math.hypot(a, b) < 2 - 1e-12:
        return False
    if (2 - a) / b < 2 - 1e-12:
        return False
    return True


_okD22 = True
for _i22 in range(1, 300):
    for _j22 in range(1, 300):
        _a22, _b22 = _i22 / 200, _j22 / 200
        if _inD22(_a22, _b22) != (
            _a22 * _a22 + _b22 * _b22 <= 1 + 1e-12 and _a22 + 2 * _b22 <= 2 + 1e-12
        ):
            _okD22 = False
_bb22 = None
for _i22 in range(1, 1001):
    for _j22 in range(1, 1001):
        _a22, _b22 = _i22 / 1000, _j22 / 1000
        if _a22 * _a22 + _b22 * _b22 <= 1 and _a22 + 2 * _b22 <= 2:
            _v22 = 3 * _a22 + 2 * _b22
            if _bb22 is None or _v22 > _bb22[0]:
                _bb22 = (_v22, _a22, _b22)
ok(
    "東北文22-3 D は a>0, b>0, a²+b²≦1, a+2b≦2。3a+2b の最大は √13（a=3/√13, b=2/√13）",
    _okD22
    and abs(_bb22[0] - math.sqrt(13)) < 2e-3
    and abs(_bb22[1] - 3 / math.sqrt(13)) < 5e-3
    and abs(_bb22[2] - 2 / math.sqrt(13)) < 5e-3
    and _inD22(3 / math.sqrt(13), 2 / math.sqrt(13))
    and abs(0.8**2 + 0.6**2 - 1) < 1e-12
    and abs(0.8 + 2 * 0.6 - 2) < 1e-12,
    f"格子探索の最大 {_bb22[0]:.6f} at ({_bb22[1]:.4f}, {_bb22[2]:.4f})、√13={math.sqrt(13):.6f}、接点 ({3/math.sqrt(13):.6f}, {2/math.sqrt(13):.6f}) は D の中",
)

_A22 = (1.0, math.sqrt(2), math.sqrt(3))
_B22 = (-math.sqrt(3), 0.0, 1.0)
_C22 = (math.sqrt(6), -math.sqrt(3), math.sqrt(2))
_n22 = (
    _A22[1] * _B22[2] - _A22[2] * _B22[1],
    _A22[2] * _B22[0] - _A22[0] * _B22[2],
    _A22[0] * _B22[1] - _A22[1] * _B22[0],
)
_nn22 = math.sqrt(sum(c * c for c in _n22))
_H22 = tuple(c / _nn22 for c in _n22)
_d22 = abs(sum(_n22[i] * _C22[i] for i in range(3))) / _nn22
ok(
    "東北文22-4 H=(√3/6, -√6/3, 1/2)、平面 OAB と C の距離 2√2、体積 4√3/3",
    abs(_nn22 - 2 * math.sqrt(6)) < 1e-9
    and abs(_H22[0] - math.sqrt(3) / 6) < 1e-9
    and abs(_H22[1] + math.sqrt(6) / 3) < 1e-9
    and abs(_H22[2] - 0.5) < 1e-9
    and abs(math.sqrt(sum(c * c for c in _H22)) - 1) < 1e-12
    and abs(_d22 - 2 * math.sqrt(2)) < 1e-9
    and abs(abs(sum(_n22[i] * _C22[i] for i in range(3))) / 6 - 4 * math.sqrt(3) / 3) < 1e-9
    and abs(sum(_A22[i] * _B22[i] for i in range(3))) < 1e-12,
    f"n=({_n22[0]:.9f}, {_n22[1]:.9f}, {_n22[2]:.9f})、|n|={_nn22:.9f}、H=({_H22[0]:.9f}, {_H22[1]:.9f}, {_H22[2]:.9f})、距離={_d22:.9f}、体積={abs(sum(_n22[i]*_C22[i] for i in range(3)))/6:.9f}",
)

# --- 東北大学 2021年度（文系） -------------------------------------------------
# 第1問・第2問は理系と同じ問題なので、確認も理系の側（東北理21-1、東北理21-3）で済ませている。

_Rof21 = lambda r: (r + math.sqrt(4 - 3 * r * r)) / 2
_r21 = math.sqrt(3) / 3
_RR21 = _Rof21(_r21)
_P21 = (1.0, _r21)


def _ang21(V, U, W):
    a = (U[0] - V[0], U[1] - V[1])
    b = (W[0] - V[0], W[1] - V[1])
    return math.degrees(math.acos((a[0] * b[0] + a[1] * b[1]) / (math.hypot(*a) * math.hypot(*b))))


random.seed(20210225)
_hit21 = 0
_n21 = 400000
for _ in range(_n21):
    _x21 = random.uniform(-1.3, 1.7)
    _y21 = random.uniform(-1.3, 1.3)
    if _x21 * _x21 + _y21 * _y21 <= _RR21**2 and (_x21 - 1) ** 2 + _y21 * _y21 <= _r21**2:
        _hit21 += 1
_mc21 = _hit21 / _n21 * (3.0 * 2.6)
_ex21 = 7 * math.pi / 18 - math.sqrt(3) / 3
ok(
    "東北文21-3 C₁ の半径は (r+√(4-3r²))/2、r=√3/3 で ∠PAO=90°、共通部分は 7π/18 - √3/3",
    all(abs(_Rof21(r) ** 2 + r * r - _Rof21(r) * r - 1) < 1e-12 for r in (0.3, 0.5, _r21, 0.8, 0.95))
    and abs(_RR21 - 2 * math.sqrt(3) / 3) < 1e-12
    and abs(math.hypot(*_P21) - _RR21) < 1e-12
    and abs(math.dist((1.0, 0.0), _P21) - _r21) < 1e-12
    and abs(_ang21(_P21, (0.0, 0.0), (1.0, 0.0)) - 60) < 1e-9
    and abs(_ang21((1.0, 0.0), _P21, (0.0, 0.0)) - 90) < 1e-9
    and abs(math.pi * _r21**2 / 2 + 0.5 * _RR21**2 * (math.pi / 3 - math.sin(math.pi / 3)) - _ex21)
    < 1e-12
    and abs(_mc21 - _ex21) < 5e-3,
    f"R={_RR21:.9f}（2√3/3={2*math.sqrt(3)/3:.9f}）、∠OPA={_ang21(_P21,(0,0),(1,0)):.6f}°、∠PAO={_ang21((1,0),_P21,(0,0)):.6f}°、面積 モンテカルロ {_mc21:.6f}／式 {_ex21:.9f}",
)

_poly21 = lambda t: 9 * t**4 + 4 * t**3 - 24 * t * t - 16 * t - 48
_roots21 = []
_prev21 = _poly21(-10.0)
for _i21 in range(-99999, 100001):
    _t21 = _i21 / 10000
    _cur21 = _poly21(_t21)
    if _cur21 == 0 or _prev21 * _cur21 < 0:
        _roots21.append(round(_t21, 3))
    _prev21 = _cur21
_S21 = (
    quad(lambda x: x * x + 4 * x + 16 - (8 * x + 12), 2, 4, 20001)[0]
    + quad(lambda x: x * x + 4 * x + 16 - (16 * x - 20), 4, 6, 20001)[0]
)
ok(
    "東北文21-4 共通接線は y=16x-20 と y=8x+12、囲まれた部分の面積は 16/3",
    abs(3 * 4 + 2 * 2 - 16) < 1e-12
    and abs(-2 * 8 - 4 - (-20)) < 1e-12
    and abs(3 * 4 - 4 - 8) < 1e-12
    and abs(16 - 4 - 12) < 1e-12
    and abs((2 * 6 + 4) - 16) < 1e-12
    and abs(-36 + 16 - (-20)) < 1e-12
    and abs((2 * 2 + 4) - 8) < 1e-12
    and abs(-4 + 16 - 12) < 1e-12
    and sorted(set(_roots21)) == [-2.0, 2.0]
    and abs(_S21 - 16 / 3) < 1e-9,
    f"4次式の実数解は {sorted(set(_roots21))}、面積 {_S21:.9f}（16/3={16/3:.9f}）、2直線の交点は (4, 44)",
)

# --- 東北大学 2020年度（文系） -------------------------------------------------
# 第2問・第3問は理系と同じ問題なので、確認も理系の側（東北理20-3、東北理20-2）で済ませている。


def _f20b(x, a):
    if x < -2:
        return 0.0
    if x <= a:
        return (x - a) * (x + 2)
    if x <= 3:
        return 2 * (x - a) * (x - 3)
    return 0.0


_S20 = lambda a: (a + 2) ** 3 / 6 + (3 - a) ** 3 / 3
_ok20b = True
for _a20 in (-2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 8 - 5 * math.sqrt(2)):
    _num20 = -quad(lambda x, a=_a20: _f20b(x, a), -2, _a20, 8001)[0] - quad(
        lambda x, a=_a20: _f20b(x, a), _a20, 3, 8001
    )[0]
    if abs(_num20 - _S20(_a20)) > 1e-6:
        _ok20b = False
    if any(_f20b(-2 + 5 * i / 500, _a20) > 1e-12 for i in range(501)):
        _ok20b = False
_vals20 = [(_S20(i / 20000 * 5 - 2), i / 20000 * 5 - 2) for i in range(20001)]
_min20 = min(_vals20)
_max20b = max(_vals20)
ok(
    "東北文20-1 S(a)=(a+2)³/6+(3-a)³/3、最大は a=-2、最小は a=8-5√2",
    _ok20b
    and abs(_min20[1] - (8 - 5 * math.sqrt(2))) < 1e-3
    and abs(_min20[0] - 125 * (3 - 2 * math.sqrt(2)) / 3) < 1e-6
    and abs(_max20b[1] + 2) < 1e-6
    and abs(_max20b[0] - 125 / 3) < 1e-9
    and abs(_S20(3) - 125 / 6) < 1e-9,
    f"最小 {_min20[0]:.9f} at a={_min20[1]:.6f}（8-5√2={8-5*math.sqrt(2):.6f}、125(3-2√2)/3={125*(3-2*math.sqrt(2))/3:.9f}）、最大 {_max20b[0]:.9f} at a={_max20b[1]:.1f}",
)

_xy20 = set()
_c06_20 = 0
_cang20 = 0
_bys20 = []
for _bits20 in itertools.product([0, 1], repeat=6):
    _s20 = sum(_bits20)
    _t20 = 6 - _s20
    _x20, _y20 = 2 * _s20 - _t20, -_s20 + 2 * _t20
    _xy20.add(_x20 + _y20)
    if (_x20, _y20) == (0, 6):
        _c06_20 += 1
    _cos20 = (3 * _x20 + _y20) / (math.hypot(_x20, _y20) * math.hypot(3, 1))
    if _cos20 >= math.cos(math.pi / 6) - 1e-12:
        _cang20 += 1
        _bys20.append(_s20)
ok(
    "東北文20-4 x+y=6、p=(0,6) の確率 15/64、q とのなす角 ≦π/6 の確率 35/64（s=3,4）",
    _xy20 == {6}
    and Fraction(_c06_20, 64) == Fraction(15, 64)
    and Fraction(_cang20, 64) == Fraction(35, 64)
    and sorted(set(_bys20)) == [3, 4],
    f"x+y の値は {_xy20}、p=(0,6) は {_c06_20}/64、なす角 ≦30° は {_cang20}/64（s={sorted(set(_bys20))}）",
)

# --- 東北大学 2019年度（文系） -------------------------------------------------
# 第2問は理系と同じ問題なので、確認も理系の側（東北理19-2）で済ませている。

_b19 = (1 - math.sqrt(5)) / 2
_a19 = 2 - math.sqrt(5)
_c19 = _b19 * _b19
_best19 = None
_k19 = -60000
while _k19 < 0:
    _bb19 = _k19 / 20000
    _aa19 = _bb19**3
    _err19 = abs(_bb19 + _bb19 * _bb19 - _aa19)
    if _best19 is None or _err19 < _best19[0]:
        _best19 = (_err19, _bb19)
    _k19 += 1
ok(
    "東北文19-1 a=2-√5、b=(1-√5)/2（c=b²、b+c=bc=a、判別式 a²-4a=1>0）",
    abs(_b19 + _c19 - _a19) < 1e-12
    and abs(_b19 * _c19 - _a19) < 1e-12
    and abs(_b19**3 - _a19) < 1e-12
    and abs(_b19 * _b19 + _a19 - _a19 * _b19) < 1e-12
    and abs(_c19 * _c19 + _a19 - _a19 * _c19) < 1e-12
    and abs(_a19 * _a19 - 4 * _a19 - 1) < 1e-12
    and _b19 < 0
    and abs(_best19[1] - _b19) < 1e-4,
    f"a={_a19:.9f}、b={_b19:.9f}、c={_c19:.9f}、b+c={_b19+_c19:.9f}、bc={_b19*_c19:.9f}、判別式={_a19*_a19-4*_a19:.9f}、走査の b={_best19[1]:.5f}",
)

_A19 = [None, Fraction(1), Fraction(3)]
for _n19 in range(1, 10):
    _A19.append(2 * _A19[_n19 + 1] ** 2 / _A19[_n19])
_f19seq = lambda n: Fraction(3) ** (n - 1) * Fraction(2) ** ((n - 1) * (n - 2) // 2)
ok(
    "東北文19-3 aₙ はすべて正、aₙ=3^(n-1)·2^((n-1)(n-2)/2)",
    all(_A19[n] > 0 for n in range(1, 11))
    and all(_A19[n] == _f19seq(n) for n in range(1, 11))
    and all(_A19[n + 1] / _A19[n] == Fraction(3) * Fraction(2) ** (n - 1) for n in range(1, 10)),
    f"aₙ n=1..8 は {[str(_A19[n]) for n in range(1,9)]}、比は {[str(_A19[n+1]/_A19[n]) for n in range(1,8)]}",
)

_P19k = lambda n, k, j: Fraction(math.comb(n, j)) * Fraction((2**k - 1) ** (n - j), 2 ** (k * n))
_step19 = {0: {3: Fraction(1)}}
for _k in range(1, 5):
    _nx19 = {}
    for _j, _pr in _step19[_k - 1].items():
        for _m in range(_j + 1):
            _nx19[_m] = _nx19.get(_m, Fraction(0)) + _pr * Fraction(math.comb(_j, _m), 2**_j)
    _step19[_k] = _nx19
_ans19 = _step19[3].get(0, Fraction(0)) - _step19[2].get(0, Fraction(0))
ok(
    "東北文19-4 P₁(j)=nCj/2ⁿ、Pₖ(j)=nCj(2ᵏ-1)^(n-j)/2^(kn)、n=3 の (3) は 127/512",
    all(
        abs(_step19[k].get(j, Fraction(0)) - _P19k(3, k, j)) == 0
        for k in range(1, 5)
        for j in range(4)
    )
    and _P19k(3, 1, 1) == Fraction(3, 8)
    and _ans19 == Fraction(127, 512),
    f"P₂(j)={[str(_step19[2].get(j, Fraction(0))) for j in range(4)]}、P₃(j)={[str(_step19[3].get(j, Fraction(0))) for j in range(4)]}、P₃(0)-P₂(0)={_ans19}",
)

# --- 東京科学大学 2025年度 -----------------------------------------------------

_fK = lambda x: x * math.log(1 + x)
_FK = lambda x: (x * x - 1) / 2 * math.log(1 + x) - x * x / 4 + x / 2
_hK = 1e-6
_okK1a = all(
    abs((_FK(x + _hK) - _FK(x - _hK)) / (2 * _hK) - _fK(x)) < 1e-7 for x in (0.3, 1.0, 2.0, 3.5)
)


def _gK(y):
    lo, hi = 0.0, 50.0
    for _ in range(120):
        mid = (lo + hi) / 2
        if _fK(mid) < y:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


_aK = math.log(2)
_bK = 2 * math.log(3)
_IK = quad(_gK, _aK, _bK, 4001)[0]
_IexK = 2.5 * math.log(3) - math.log(2) + 0.25
_RK = lambda x: (x * x - 1) / 2 * math.log(1 + x) - x * x / 4 + 1.5 * x
_okK1c = all(
    abs(quad(lambda u: 1 + _fK(u), 0, x, 8001)[0] - _RK(x)) < 1e-7 for x in (0.5, 1.0, 2.0, 3.0)
)
ok(
    "科学大25-1 ∫x log(1+x)dx、I=(5/2)log3-log2+1/4、R(x)=(x²-1)/2·log(1+x)-x²/4+3x/2",
    _okK1a
    and abs(_fK(1) - _aK) < 1e-12
    and abs(_fK(2) - _bK) < 1e-12
    and abs(_IK - _IexK) < 1e-5
    and _okK1c,
    f"a=f(1)={_fK(1):.9f}、b=f(2)={_fK(2):.9f}、I 数値 {_IK:.9f}／式 {_IexK:.9f}",
)

_sK = Fraction(1, 9)
_uK = Fraction(7, 9)
_PK = (_sK, -_sK, Fraction(1))
_QK = (Fraction(1), _uK, 3 - 2 * _uK)
_dK = tuple(_QK[i] - _PK[i] for i in range(3))


def _VK(t):
    A = (t, -t, 1.0)
    B = (2 + t + math.sin(t), -2 - t - math.sin(t), 1.0)
    C = (1.0, t, 3 - 2 * t)
    D = (1.0, 2 + t + math.cos(t), -1 - 2 * t - 2 * math.cos(t))
    u1 = [B[i] - A[i] for i in range(3)]
    u2 = [C[i] - A[i] for i in range(3)]
    u3 = [D[i] - A[i] for i in range(3)]
    det = (
        u1[0] * (u2[1] * u3[2] - u2[2] * u3[1])
        - u1[1] * (u2[0] * u3[2] - u2[2] * u3[0])
        + u1[2] * (u2[0] * u3[1] - u2[1] * u3[0])
    )
    return abs(det) / 6


_VfK = lambda t: (2 / 3) * (2 + math.sin(t)) * (2 + math.cos(t))
_valsK = [(_VfK(i / 20000 * 2 * math.pi), i / 20000 * 2 * math.pi) for i in range(20001)]
ok(
    "科学大25-2 P(1/9,-1/9,1)・Q(1,7/9,13/9)・PQ=4/3、V(t)=2/3(2+sin t)(2+cos t)、最大最小は (9±4√2)/3",
    _dK[0] - _dK[1] == 0
    and _dK[1] - 2 * _dK[2] == 0
    and abs(math.sqrt(sum(float(c) ** 2 for c in _dK)) - 4 / 3) < 1e-12
    and all(abs(_VK(t) - _VfK(t)) < 1e-9 for t in (0.0, 0.7, 1.5, 3.0, 5.0, 10.0))
    and abs(_VK(0.0) - 4) < 1e-9
    and abs(max(_valsK)[0] - (9 + 4 * math.sqrt(2)) / 3) < 1e-6
    and abs(min(_valsK)[0] - (9 - 4 * math.sqrt(2)) / 3) < 1e-6
    and abs(max(_valsK)[1] - math.pi / 4) < 1e-3
    and abs(min(_valsK)[1] - 5 * math.pi / 4) < 1e-3,
    f"PQ=({_dK[0]}, {_dK[1]}, {_dK[2]})、|PQ|={math.sqrt(sum(float(c)**2 for c in _dK)):.9f}、V(0)={_VK(0.0):.9f}、最大 {max(_valsK)[0]:.9f}／最小 {min(_valsK)[0]:.9f}",
)


def _QgameK(p, N=40):
    res = {}
    st = {(0, False): 1.0}
    for _ in range(N):
        nx = {}
        for (n, prevT), pr in st.items():
            nx[(n + 1, False)] = nx.get((n + 1, False), 0) + pr * p
            if prevT:
                res[n] = res.get(n, 0) + pr * (1 - p)
            else:
                nx[(n, True)] = nx.get((n, True), 0) + pr * (1 - p)
        st = nx
    return res


_okK3 = True
for _pK in (0.5, 0.3):
    _rK = _QgameK(_pK, 150)
    for _nK in range(5):
        if abs(_rK.get(_nK, 0) - (1 - _pK) ** 2 * (_pK * (2 - _pK)) ** _nK) > 1e-9:
            _okK3 = False
    if abs(sum(n * v for n, v in _rK.items()) - _pK * (2 - _pK) / (1 - _pK) ** 2) > 1e-4:
        _okK3 = False
_S40K = sum((n + 1) * 0.5**n for n in range(200))
ok(
    "科学大25-3 Qₙ=(1-p)²{p(2-p)}ⁿ、Σ(n+1)xⁿ=1/(1-x)²、Σ nQₙ=p(2-p)/(1-p)²",
    _okK3 and abs(_S40K - 1 / (1 - 0.5) ** 2) < 1e-9,
    f"p=0.3 で Σ nQₙ={sum(n*v for n,v in _QgameK(0.3,150).items()):.9f}（式 {0.3*1.7/0.49:.9f}）、x=0.5 の部分和 {_S40K:.9f}（1/(1-x)²=4）",
)

_aFK = [None, 1, 1]
for _nK in range(1, 30):
    _aFK.append(_aFK[_nK + 1] + _aFK[_nK])
_bFK = lambda n: math.atan(1 / _aFK[n])
ok(
    "科学大25-4 aₙ₊₁aₙ₋₁-aₙ²=(-1)ⁿ、a₂ₘ·tan(b₂ₘ₊₁+b₂ₘ₊₂)=1、Σb₂ₘ₊₁=π/2",
    all(_aFK[n + 1] * _aFK[n - 1] - _aFK[n] ** 2 == (-1) ** n for n in range(2, 20))
    and all(abs(_aFK[2 * m] * math.tan(_bFK(2 * m + 1) + _bFK(2 * m + 2)) - 1) < 1e-9 for m in range(1, 9))
    and abs(sum(_bFK(2 * m + 1) for m in range(0, 14)) - math.pi / 2) < 1e-5,
    f"aₙ₊₁aₙ₋₁-aₙ² は n=2..9 で {[_aFK[n+1]*_aFK[n-1]-_aFK[n]**2 for n in range(2,10)]}、Σ_{{m=0}}^{{13}} b₂ₘ₊₁={sum(_bFK(2*m+1) for m in range(0,14)):.9f}（π/2={math.pi/2:.9f}）",
)

_f5K = lambda t: (t * t - 1) / t**3
_A5K = 2 * math.sqrt(3) / 9


def _solK(k, lo=-80.0, hi=80.0, N=50000):
    sols = []
    prev = None
    pt = None
    for i in range(N + 1):
        t = lo + (hi - lo) * i / N
        if abs(t) < 1e-9:
            prev = None
            pt = None
            continue
        v = _f5K(t) - k
        if prev is not None and (v == 0 or prev * v < 0):
            sols.append(pt + (t - pt) * abs(prev) / (abs(prev) + abs(v)))
        prev = v
        pt = t
    return sols


_xsK = []
for _iK in range(1, 60):
    _kK = -0.6 + 1.2 * _iK / 60
    if abs(_kK) < 1e-9:
        continue
    _ssK = _solK(_kK)
    if len(_ssK) >= 3:
        _xsK.append(min(_ssK))
_negK = [x for x in _xsK if x < -1.5]
_midK = [x for x in _xsK if x > -1.5]
ok(
    "科学大25-5 f'(t)=(3-t²)/t⁴、極値 ±2√3/9、x<-√3 または -1<x<-√3/2",
    abs(_f5K(math.sqrt(3)) - _A5K) < 1e-12
    and abs(_f5K(-math.sqrt(3)) + _A5K) < 1e-12
    and abs(_f5K(-math.sqrt(3) / 2) - _A5K) < 1e-12
    and max(_negK) < -math.sqrt(3)
    and min(_midK) > -1
    and max(_midK) < -math.sqrt(3) / 2 + 1e-3
    and min(_midK) < -0.95,
    f"f(-√3/2)={_f5K(-math.sqrt(3)/2):.9f}（2√3/9={_A5K:.9f}）、左の範囲 [{min(_negK):.4f}, {max(_negK):.4f}]（-√3={-math.sqrt(3):.4f}）、右の範囲 [{min(_midK):.4f}, {max(_midK):.4f}]（-1 と {-math.sqrt(3)/2:.4f}）",
)

# --- 東京科学大学 2024年度 -----------------------------------------------------


def _cen24(a):
    s = a / (a + math.sqrt(a * a + 1))
    return (a * (1 - s), a * a / 2 + s)


_h24 = 1e-6
_X24 = lambda a: _cen24(a)[0]
_Y24 = lambda a: _cen24(a)[1]
_sl24 = ((_Y24(1 + _h24) - _Y24(1 - _h24)) / (2 * _h24)) / (
    (_X24(1 + _h24) - _X24(1 - _h24)) / (2 * _h24)
)
_okC24 = True
for _a24 in (0.5, 1.0, 2.0):
    _cx, _cy = _cen24(_a24)
    if abs(_cx - math.dist((_cx, _cy), (_a24, _a24 * _a24 / 2))) > 1e-12:
        _okC24 = False
    if abs((_cx - _a24) + (_cy - _a24 * _a24 / 2) * _a24) > 1e-12:
        _okC24 = False
ok(
    "科学大24-1 P(2-√2, √2-1/2)、P での軌跡 C の接線の傾きは 1+√2",
    _okC24
    and abs(_cen24(1.0)[0] - (2 - math.sqrt(2))) < 1e-12
    and abs(_cen24(1.0)[1] - (math.sqrt(2) - 0.5)) < 1e-12
    and abs(_sl24 - (1 + math.sqrt(2))) < 1e-6,
    f"P=({_cen24(1.0)[0]:.9f}, {_cen24(1.0)[1]:.9f})、(2-√2, √2-1/2)=({2-math.sqrt(2):.9f}, {math.sqrt(2)-0.5:.9f})、傾き {_sl24:.9f}（1+√2={1+math.sqrt(2):.9f}）",
)

_f24 = lambda t: 1 / math.cosh(t)
_g24 = lambda t: math.tanh(t)
_ok24a = all(
    abs((_f24(t + _h24) - _f24(t - _h24)) / (2 * _h24) + _f24(t) * _g24(t)) < 1e-7
    and abs((_g24(t + _h24) - _g24(t - _h24)) / (2 * _h24) - _f24(t) ** 2) < 1e-7
    for t in (-1.0, 0.0, 0.7, 2.0)
)
_p24 = lambda t: _f24(t) ** 2 + _g24(t) ** 2
_q24 = lambda t: math.log((1 + _g24(t)) / (1 - _g24(t)))
_T24 = math.atanh(1 / math.sqrt(2))
_L24 = quad(
    lambda t: math.hypot(
        (_f24(t + _h24) - _f24(t - _h24)) / (2 * _h24),
        (_g24(t + _h24) - _g24(t - _h24)) / (2 * _h24),
    ),
    0,
    _T24,
    8001,
)[0]
ok(
    "科学大24-2 p'(t)=0、q'(t)=2、lim g=1、曲線の長さは π/4",
    _ok24a
    and all(abs(_p24(t) - 1) < 1e-12 for t in (-1.0, 0.0, 0.7, 2.0))
    and all(abs((_q24(t + _h24) - _q24(t - _h24)) / (2 * _h24) - 2) < 1e-7 for t in (-1.0, 0.0, 0.7, 2.0))
    and abs(_g24(30) - 1) < 1e-12
    and abs(_f24(_T24) - _g24(_T24)) < 1e-12
    and abs(_f24(_T24) - 1 / math.sqrt(2)) < 1e-12
    and abs(_L24 - math.pi / 4) < 1e-6,
    f"p(t)={_p24(0.7):.12f}、q'(t)={(_q24(0.7+_h24)-_q24(0.7-_h24))/(2*_h24):.9f}、g(30)={_g24(30):.12f}、T={_T24:.9f}、長さ {_L24:.9f}（π/4={math.pi/4:.9f}）",
)

_ok24b = True
for _a24b, _b24b in ((1.0, 2.0), (2.0, 3.0), (1.0, 5.0)):
    _xs = [_a24b]
    for _ in range(32):
        _xs.append(_a24b + (_a24b**2 / _b24b**2) * (_xs[-1] + _a24b))
    _fx = lambda n, a=_a24b, b=_b24b: a * (a * a + b * b - 2 * a * a * (a / b) ** (2 * n)) / (b * b - a * a)
    _fy = lambda n, a=_a24b, b=_b24b: -2 * a * a * b * (1 - (a / b) ** (2 * n)) / (b * b - a * a)
    _fS = lambda n, a=_a24b, b=_b24b: a * b * (a * a + b * b - 2 * a * a * (a / b) ** (2 * n)) / (b * b - a * a)
    for _n24 in range(0, 8):
        if abs(_xs[_n24] - _fx(_n24)) > 1e-9:
            _ok24b = False
        _C = (-_a24b, 0.0)
        _B = (0.0, _b24b)
        _An = (_fx(_n24), _fy(_n24))
        _ar = abs((_B[0] - _C[0]) * (_An[1] - _C[1]) - (_B[1] - _C[1]) * (_An[0] - _C[0])) / 2
        if abs(_ar - _fS(_n24)) > 1e-9:
            _ok24b = False
    if abs(
        math.dist((0.0, _b24b), (_fx(40), _fy(40))) / math.hypot(_a24b, _b24b)
        - (_a24b**2 + _b24b**2) / (_b24b**2 - _a24b**2)
    ) > 1e-9:
        _ok24b = False
ok(
    "科学大24-3 xₙ・yₙ の一般項、Sₙ=b·xₙ、BAₙ/BC → (a²+b²)/(b²-a²)",
    _ok24b,
    "(a,b)=(1,2),(2,3),(1,5) で漸化式の値・面積・極限をすべて照合",
)


def _odd24(ps):
    pe, po = 1.0, 0.0
    for p in ps:
        pe, po = pe * (1 - p) + po * p, po * (1 - p) + pe * p
    return po


_Z24 = _odd24([1 / (3 * 2000)] * 2000 + [2 / (3 * 2000)] * 2000 + [1 / 2000] * 2000)
ok(
    "科学大24-4 Xₙ=(1-3⁻ⁿ)/2、Yₙ=n/(2(n+1))、lim Z₃ₘ=(1-e⁻⁴)/2",
    all(abs(_odd24([1 / 3] * n) - (1 - (1 / 3) ** n) / 2) < 1e-12 for n in (1, 2, 3, 5, 8))
    and all(
        abs(_odd24([1 / (2 * (k + 1)) for k in range(1, n + 1)]) - n / (2 * (n + 1))) < 1e-12
        for n in (1, 2, 3, 5, 8)
    )
    and abs(_Z24 - (1 - math.exp(-4)) / 2) < 1e-4,
    f"X₈={_odd24([1/3]*8):.9f}、Y₈={_odd24([1/(2*(k+1)) for k in range(1,9)]):.9f}、m=2000 の Z={_Z24:.9f}（(1-e⁻⁴)/2={(1-math.exp(-4))/2:.9f}）",
)

_good24 = []
for _a24c in range(-10, 11):
    for _b24c in range(-10, 11):
        _D24 = _a24c * _a24c - 4 * _b24c
        if _D24 >= 0:
            _rs = [complex((-_a24c + math.sqrt(_D24)) / 2, 0), complex((-_a24c - math.sqrt(_D24)) / 2, 0)]
        else:
            _rs = [complex(-_a24c / 2, math.sqrt(-_D24) / 2), complex(-_a24c / 2, -math.sqrt(-_D24) / 2)]
        _okall = True
        for _r in _rs:
            if abs(abs(_r) - 1) > 1e-12:
                _okall = False
                break
            _z = complex(1, 0)
            _found = False
            for _n24c in range(1, 400):
                _z = _z * _r
                if abs(_z - 1) < 1e-9:
                    _found = True
                    break
            if not _found:
                _okall = False
                break
        if _okall:
            _good24.append((_a24c, _b24c))
ok(
    "科学大24-5 (a,b)=(-2,1),(-1,1),(0,-1),(0,1),(1,1),(2,1) の6組",
    sorted(_good24) == [(-2, 1), (-1, 1), (0, -1), (0, 1), (1, 1), (2, 1)],
    f"-10≦a,b≦10 の全探索で {sorted(_good24)}",
)

# --- 東京科学大学 2023年度 -----------------------------------------------------

_I23 = quad(lambda x: 2 / (x + math.exp(x)), 0, 40, 40001)[0]
_ok23a = all(
    2 / (x + math.exp(x)) >= math.exp(-x) + math.exp(-2 * x) / 2 - 1e-15
    for x in (i / 50 for i in range(0, 1000))
)
_ok23b = all(2 / (x + math.exp(x)) <= 2 * math.exp(-x) for x in (i / 50 for i in range(1, 1000)))
ok(
    "科学大23-1 5/4 < ∫₀^2023 2/(x+eˣ)dx < 2、整数部分は 1",
    _ok23a and _ok23b and 1.25 < _I23 < 2,
    f"数値積分 {_I23:.9f}（下の評価 5/4、上の評価 2）",
)

_sol23 = []
for _x23 in range(-200, 201):
    _A23 = _x23**3 - _x23
    if _A23 == 0 or 86400 % (_A23 * _A23) != 0:
        continue
    _B23 = 86400 // (_A23 * _A23)
    for _y23 in range(-200, 201):
        if _y23**3 - _y23 == _B23:
            _sol23.append((_x23, _y23))
ok(
    "科学大23-2 (x,y)=(±4,3),(±5,2) の4組",
    sorted(_sol23) == [(-5, 2), (-4, 3), (4, 3), (5, 2)],
    f"-200≦x≦200 の全探索で {sorted(_sol23)}",
)

_cards23 = [0.0, 1.0, math.sqrt(3)]
_zs23 = [complex(_cards23[a], _cards23[b]) for a in range(3) for b in range(3) if a != b]
_ok23c = True
for _n23 in (1, 2, 3, 4):
    _tot23 = 0
    _c1 = 0
    _c2 = 0
    for _comb in itertools.product(range(6), repeat=_n23):
        _z23 = complex(1, 0)
        for _i in _comb:
            _z23 *= _zs23[_i]
        _tot23 += 1
        if abs(_z23) < 5 - 1e-12:
            _c1 += 1
        _z2 = _z23 * _z23
        if abs(_z2.imag) < 1e-9 * max(1.0, abs(_z2)):
            _c2 += 1
    if Fraction(_c1, _tot23) != Fraction(2 * _n23 * _n23 + 1, 3**_n23):
        _ok23c = False
    if Fraction(_c2, _tot23) != Fraction(2 ** (_n23 - 1) + 1, 3 * 2 ** (_n23 - 1)):
        _ok23c = False
ok(
    "科学大23-3 Pₙ=(2n²+1)/3ⁿ、Qₙ=(1/3)(1+2^(1-n))",
    _ok23c,
    "n=1..4 で 6ⁿ 通りを全列挙して照合",
)


def _LA23(t):
    r = math.sqrt(max(0.0, 4 - t * t))
    return 2 * r if abs(t) >= 1 else 2 * (r - 1)


def _LB23(t):
    r = math.sqrt(max(0.0, 4 - t * t))
    lo = math.sqrt(2) - abs(t)
    return 2 * r if lo <= 0 else 2 * (r - lo)


_V23 = quad(lambda t: _LA23(t) * _LB23(t), -2, 2, 40001)[0]
_Vex23 = 60 - 16 * math.sqrt(2) / 3 - 4 * math.sqrt(3) - 8 * math.pi / 3 - 4 * math.sqrt(2) * math.pi
ok(
    "科学大23-4 体積は 60 - 4√3 - 16√2/3 - 8π/3 - 4√2π",
    abs(_V23 - _Vex23) < 2e-3,
    f"断面積の数値積分 {_V23:.6f}、式 {_Vex23:.6f}",
)

_A23p = (1.0, 0.0, 0.0)
_B23p = (1.0, 1.0, 1.0)
_C23p = (-1.0, 1.0, -1.0)
_D23p = (-1.0, 0.0, 0.0)


def _dline23(P, Q, R):
    u = [R[i] - Q[i] for i in range(3)]
    w = [P[i] - Q[i] for i in range(3)]
    cr = [
        w[1] * u[2] - w[2] * u[1],
        w[2] * u[0] - w[0] * u[2],
        w[0] * u[1] - w[1] * u[0],
    ]
    return math.sqrt(sum(c * c for c in cr)) / math.sqrt(sum(c * c for c in u))


random.seed(20230225)
_okpl23 = True
for _ in range(2000):
    _P23 = (random.uniform(-5, 5), random.uniform(-5, 5), random.uniform(-5, 5))
    _eq = abs(_dline23(_P23, _A23p, _B23p) - _dline23(_P23, _B23p, _C23p)) < 1e-9
    _pl = abs((_P23[0] - _P23[1]) * (_P23[0] + _P23[1] + 2 * _P23[2] - 4)) < 1e-9
    if _eq != _pl:
        _okpl23 = False
_s2 = math.sqrt(2)
_cands23 = [
    ((0.0, 0.0, -_s2), _s2),
    ((0.0, 0.0, _s2), _s2),
    ((2 * _s2, 4.0, -_s2), 3 * _s2),
    ((-2 * _s2, 4.0, _s2), 3 * _s2),
    ((_s2, -_s2, 2.0), math.sqrt(6)),
    ((-_s2, -_s2, -2.0), math.sqrt(6)),
    ((_s2, _s2, -2.0), math.sqrt(6)),
    ((-_s2, _s2, 2.0), math.sqrt(6)),
]
_oksp23 = all(
    all(
        abs(d - r) < 1e-9
        for d in (
            _dline23(P, _A23p, _B23p),
            _dline23(P, _B23p, _C23p),
            _dline23(P, _C23p, _D23p),
            _dline23(P, _D23p, _A23p),
        )
    )
    for P, r in _cands23
)
ok(
    "科学大23-5 等距離の図形は2平面 x=y と x+y+2z=4、4直線に接する球面は8組",
    _okpl23 and _oksp23,
    f"乱数2000点で (1) を確認。8つの中心すべてで4直線への距離が半径（√2, 3√2, √6）に一致",
)

# --- 東京科学大学 2022年度 -----------------------------------------------------


def _reach22(x, y):
    """z=x+yi が |a|≦1, |b|≦1 の z²+az+b=0 の解になれるか。"""
    if abs(y) < 1e-12:
        lo = -x * x - abs(x)
        hi = -x * x + abs(x)
        return hi >= -1 - 1e-12 and lo <= 1 + 1e-12
    return abs(-2 * x) <= 1 + 1e-12 and abs(x * x + y * y) <= 1 + 1e-12


_phi22 = (1 + math.sqrt(5)) / 2
_bad22 = 0
for _i22 in range(-200, 201):
    for _j22 in range(-200, 201):
        _x22, _y22 = _i22 / 80, _j22 / 80
        _pred22 = (abs(_y22) < 1e-12 and abs(_x22) <= _phi22 + 1e-12) or (
            abs(_y22) >= 1e-12 and abs(_x22) <= 0.5 + 1e-12 and _x22**2 + _y22**2 <= 1 + 1e-12
        )
        if _reach22(_x22, _y22) != _pred22:
            _bad22 += 1
ok(
    "科学大22-1 実軸上は |z|≦(1+√5)/2、虚数なら |Re z|≦1/2 かつ |z|≦1",
    _bad22 == 0 and _reach22(_phi22, 0) and not _reach22(_phi22 + 0.01, 0),
    f"0.0125 刻みの格子で不一致 {_bad22} 件。φ=(1+√5)/2={_phi22:.9f} は可、{_phi22+0.01:.4f} は不可",
)

_got22 = set()
for _a22 in range(1, 31):
    for _b22 in range(1, 31):
        for _c22 in range(1, 31):
            if math.gcd(math.gcd(_a22, _b22), _c22) != 1:
                continue
            _got22.add(
                math.gcd(
                    math.gcd(_a22 + _b22 + _c22, _a22**2 + _b22**2 + _c22**2),
                    _a22**3 + _b22**3 + _c22**3,
                )
            )
_ok22e = all(
    math.gcd(
        math.gcd(a + b + c, a * b + b * c + c * a), a * b * c
    )
    == 1
    for a in range(1, 20)
    for b in range(1, 20)
    for c in range(1, 20)
    if math.gcd(math.gcd(a, b), c) == 1
)
ok(
    "科学大22-2 e₁,e₂,e₃ の最大公約数は 1、p₁,p₂,p₃ の最大公約数は 1,2,3,6 のみ",
    _ok22e and sorted(_got22) == [1, 2, 3, 6],
    f"現れた最大公約数は {sorted(_got22)}",
)

_ok22c = True
for _al22 in (0.3, 0.7, 1.2):
    for _t22 in (0.0, 0.4, 1.0, math.pi / 2):
        _A22 = (math.sin(_t22), 0.0)
        _B22 = (0.0, math.cos(_t22))
        _P22 = (
            math.sin(_al22) * math.cos(_t22 - _al22),
            math.cos(_al22) * math.cos(_t22 - _al22),
        )
        _v1 = (_A22[0] - _P22[0], _A22[1] - _P22[1])
        _v2 = (_B22[0] - _P22[0], _B22[1] - _P22[1])
        if abs(_v1[0] * _v2[0] + _v1[1] * _v2[1]) > 1e-9:
            _ok22c = False
        _u1 = (_P22[0] - _A22[0], _P22[1] - _A22[1])
        _u2 = (_B22[0] - _A22[0], _B22[1] - _A22[1])
        _ca = (_u1[0] * _u2[0] + _u1[1] * _u2[1]) / (math.hypot(*_u1) * math.hypot(*_u2))
        if abs(math.acos(max(-1.0, min(1.0, _ca))) - _al22) > 1e-9:
            _ok22c = False
    _L22 = quad(lambda t, a=_al22: abs(math.sin(t - a)), 0, math.pi / 2, 8001)[0]
    if abs(_L22 - (2 - math.sin(_al22) - math.cos(_al22))) > 1e-7:
        _ok22c = False
    for _i22 in range(0, 4001):
        _t22 = math.pi / 2 * _i22 / 4000
        _s22 = math.cos(_t22 - _al22)
        _x22, _y22 = _s22 * math.sin(_al22), _s22 * math.cos(_al22)
        if _x22**2 - _x22 + _y22**2 < 0 and _x22**2 + _y22**2 - _y22 < 0:
            _ok22c = False
ok(
    "科学大22-3 P は直線 x cosα = y sinα 上、道のりは 2-sinα-cosα、D には入らない",
    _ok22c,
    "α=0.3,0.7,1.2 で ∠P=90°・∠A=α・道のり・D に入らないことをすべて確認",
)

_ok22d = True
for _a22 in (0.2, 0.8, 1.5):
    _cx22 = 2 * (1 + _a22**2) / (1 - 4 * _a22**2)
    _r22 = 5 * _a22 / abs(1 - 4 * _a22**2)
    for _k22 in range(400):
        _th = 2 * math.pi * _k22 / 400
        _z22 = complex(1 + _a22 * math.cos(_th), _a22 * math.sin(_th))
        _w22 = (_z22 - 3) / (1 - 2 * _z22)
        if abs(math.hypot(_w22.real - _cx22, _w22.imag) - _r22) > 1e-9:
            _ok22d = False
    if abs(_r22**2 - (_cx22 - 2) * (2 * _cx22 + 1) / 2) > 1e-9:
        _ok22d = False
_re22 = []
for _k22 in range(400):
    _z22 = complex(1 + 0.5 * math.cos(2 * math.pi * _k22 / 400), 0.5 * math.sin(2 * math.pi * _k22 / 400))
    if abs(1 - 2 * _z22) < 1e-6:
        continue  # z=1/2 は除外されている点
    _re22.append(((_z22 - 3) / (1 - 2 * _z22)).real)
ok(
    "科学大22-4 a≠1/2 で中心 2(1+a²)/(1-4a²)・半径 5a/|1-4a²|、通過領域は (x-3/4)²-y²≧25/16",
    _ok22d and max(abs(v - 0.75) for v in _re22) < 1e-9,
    f"a=0.2,0.8,1.5 で円を確認し r²=(x-2)(2x+1)/2 も一致。a=1/2 では Re w がつねに 0.75",
)

_f22 = lambda x, a: (2 / 3) * (1 + math.sin(2 * a * x))
_g22 = lambda a: 1 - math.cos(2 * a) - a
_lo22, _hi22 = math.pi / 12, math.pi / 4
for _ in range(200):
    _mid22 = (_lo22 + _hi22) / 2
    if _g22(_mid22) < 0:
        _lo22 = _mid22
    else:
        _hi22 = _mid22
_as22 = (_lo22 + _hi22) / 2
_val22 = 1 / 3 - math.cos(2 * _as22) / (3 * _as22) + math.sin(2 * _as22) / (6 * _as22**2)
_An22 = sum(
    (i / 200) * quad(lambda x: _f22(x, _as22), (i - 1) / 200, i / 200, 41)[0] for i in range(1, 201)
)
ok(
    "科学大22-5 f=2/3(1+sin2ax)、(*) は 1-cos2a=a でただ1つ、lim Aₙ/n = ∫₀¹ x f dx",
    abs(quad(lambda x: _f22(x, _as22), 0, 1, 8001)[0] - 1) < 1e-9
    and _g22(math.pi / 12) < 0 < _g22(math.pi / 4)
    and abs(_val22 - quad(lambda x: x * _f22(x, _as22), 0, 1, 8001)[0]) < 1e-9
    and abs(
        _val22
        - (2 / 3 - 1 / (3 * _as22) + math.sqrt(2 * _as22 - _as22**2) / (6 * _as22**2))
    )
    < 1e-9
    and abs(_An22 - _val22) < 5e-3,
    f"a={_as22:.9f}、∫₀¹f={quad(lambda x: _f22(x,_as22),0,1,8001)[0]:.9f}、式 {_val22:.9f}、n=200 の Aₙ/n={_An22:.9f}",
)

# --- 東京科学大学 2021年度 -----------------------------------------------------

_no9 = lambda n: "9" not in str(n)
_ak21 = [sum(1 for n in range(10 ** (k - 1), 10**k) if _no9(n)) for k in range(1, 6)]
_sum21 = [sum(1 / n for n in range(1, 10**k) if _no9(n)) for k in range(1, 6)]
ok(
    "科学大21-1 aₖ=8·9^(k-1)、Σbₙ ≦ 80(1-(9/10)^k) < 80",
    _ak21 == [8 * 9 ** (k - 1) for k in range(1, 6)]
    and all(_sum21[k - 1] <= 80 * (1 - 0.9**k) + 1e-9 for k in range(1, 6))
    and all(_sum21[k - 1] < 80 for k in range(1, 6)),
    f"aₖ 実測 {_ak21}、Σbₙ は {[round(v,6) for v in _sum21]}、評価は {[round(80*(1-0.9**k),6) for k in range(1,6)]}",
)


def _two21(a, b):
    return (a * b) ** 2 - (0.25 + a * a) * (b * b - 1) > 1e-12


_ok21a = all(
    _two21(a, b) == (b * b < 4 * a * a + 1 - 1e-12)
    for a in (i / 10 for i in range(-30, 31))
    for b in (j / 10 for j in range(-40, 41))
)
_chord21 = lambda a, b: (4 * a * a + 1 - b * b) / (0.25 + a * a) ** 2
_S5K = 2 / math.sqrt(5)
_sq21 = [(_S5K, _S5K), (-_S5K, _S5K), (-_S5K, -_S5K), (_S5K, -_S5K)]
_roots21 = []
_prev21 = (-math.sin(0.0)) ** 2 / 4 + (2 * math.cos(0.0)) ** 2 - 1
for _i21 in range(1, 20001):
    _th21 = 2 * math.pi * _i21 / 20000
    _cur21 = (-math.sin(_th21)) ** 2 / 4 + (2 * math.cos(_th21)) ** 2 - 1
    if _prev21 == 0 or _prev21 * _cur21 < 0:
        _roots21.append(round(math.cos(_th21) ** 2, 3))
    _prev21 = _cur21
ok(
    "科学大21-2 2点で交わる条件 b²<4a²+1、PQ=SR は c=-b かつ b>0、内接する正方形は1つ",
    _ok21a
    and abs(_chord21(0.7, 0.6) - _chord21(0.7, -0.6)) < 1e-12
    and all(abs(p[0] ** 2 / 4 + p[1] ** 2 - 1) < 1e-12 for p in _sq21)
    and all(abs(math.dist(_sq21[i], _sq21[(i + 1) % 4]) - 4 / math.sqrt(5)) < 1e-9 for i in range(4))
    and len(_roots21) == 4
    and all(abs(v - 0.2) < 2e-3 for v in _roots21),
    f"正方形の頂点は (±2√5/5, ±2√5/5)、1辺 {math.dist(_sq21[0], _sq21[1]):.9f}（4√5/5={4/math.sqrt(5):.9f}）。cos²θ の解は {sorted(set(_roots21))}",
)

_a21 = lambda n: math.comb(2 * n, n) // (n + 1)


def _isp21(m):
    if m < 2:
        return False
    i = 2
    while i * i <= m:
        if m % i == 0:
            return False
        i += 1
    return True


ok(
    "科学大21-3 n·C(2n,n)=(n+1)C(2n,n-1)、n≧4 で aₙ>n+2 かつ aₙ>2n-1、素数になるのは n=2,3",
    all(n * math.comb(2 * n, n) == (n + 1) * math.comb(2 * n, n - 1) for n in range(1, 30))
    and all(math.comb(2 * n, n) % (n + 1) == 0 for n in range(1, 30))
    and all(_a21(n) > n + 2 for n in range(4, 40))
    and all(_a21(n) > 2 * n - 1 for n in range(4, 40))
    and [n for n in range(1, 101) if _isp21(_a21(n))] == [2, 3],
    f"aₙ n=1..8 は {[_a21(n) for n in range(1,9)]}、素数になるのは n=2,3",
)


def _F21(A, B, C, D):
    d2 = lambda P, Q: sum((P[i] - Q[i]) ** 2 for i in range(3))
    return 2 * (d2(A, B) + d2(B, C) + d2(C, A)) - 3 * (d2(A, D) + d2(B, D) + d2(C, D))


random.seed(20210225)


def _rnd21():
    while True:
        v = [random.gauss(0, 1) for _ in range(3)]
        n = math.sqrt(sum(c * c for c in v))
        if n > 1e-6:
            return tuple(c / n for c in v)


_ok21f = True
_best21 = -1e9
for _ in range(20000):
    _A21, _B21, _C21, _D21 = _rnd21(), _rnd21(), _rnd21(), _rnd21()
    _s21 = [_A21[i] + _B21[i] + _C21[i] for i in range(3)]
    _k21 = -2 * sum(_s21[i] * (_s21[i] - 3 * _D21[i]) for i in range(3))
    if abs(_F21(_A21, _B21, _C21, _D21) - _k21) > 1e-9:
        _ok21f = False
    _best21 = max(_best21, _F21(_A21, _B21, _C21, _D21))
_Cp21 = (-0.25, math.sqrt(15) / 4, 0.0)
_Dp21 = (1.0, 0.0, 0.0)
_Ap21 = (7 / 8, -math.sqrt(15) / 8, 0.0)
ok(
    "科学大21-4 F=-2(a+b+c)·(a+b+c-3d)、M=9/2、A=B=(7/8, -√15/8, 0)",
    _ok21f
    and _best21 < 4.5 + 1e-9
    and abs(math.hypot(*_Ap21[:2]) - 1) < 1e-12
    and abs(_F21(_Ap21, _Ap21, _Cp21, _Dp21) - 4.5) < 1e-9,
    f"乱択2万組での最大 {_best21:.6f}（M=4.5）、A=B=(7/8,-√15/8,0) で F={_F21(_Ap21,_Ap21,_Cp21,_Dp21):.9f}",
)


def _inside21(a, quartic):
    for i in range(1, 20001):
        th = 2 * math.pi * i / 20000
        x = a * math.cos(th)
        y = a + a * math.sin(th)
        lim = x * x - x**4 if quartic else x * x
        if y < lim - 1e-12:
            return False
    return True


def _vol21(a, N=20000):
    tot = 0.0
    for i in range(N):
        y = 0.25 * (i + 0.5) / N
        u1 = (1 - math.sqrt(max(0.0, 1 - 4 * y))) / 2
        u2 = 2 * a * y - y * y
        if u1 > u2:
            tot += math.pi * (u1 - u2) * (0.25 / N)
    return tot


ok(
    "科学大21-5 (1)(2) とも 0<a≦1/2、回転体の体積は (3-4a)π/64",
    all(_inside21(a, False) and _inside21(a, True) for a in (0.3, 0.49, 0.5))
    and all(not _inside21(a, False) and not _inside21(a, True) for a in (0.501, 0.52, 0.6, 0.8))
    and all(abs(_vol21(a) - (3 - 4 * a) * math.pi / 64) < 1e-6 for a in (0.1, 0.3, 0.5)),
    f"a=0.5 は両方とも可、a=0.501 は両方とも不可。a=0.3 の体積 {_vol21(0.3):.9f}（式 {(3-4*0.3)*math.pi/64:.9f}）",
)

# --- 東京科学大学 2020年度 -----------------------------------------------------

_sol20K = [x for x in range(1, 500) if abs(x * x - x - 23) % 3 == 2]


def _isp20(m):
    if m < 2:
        return False
    i = 2
    while i * i <= m:
        if m % i == 0:
            return False
        i += 1
    return True


_runs20 = []
for _x20 in range(1, 3000):
    _k20 = 0
    while _isp20(abs((_x20 + _k20) ** 2 - (_x20 + _k20) - 23)):
        _k20 += 1
    if _k20 >= 4:
        _runs20.append((_x20, _k20))
ok(
    "科学大20-1 |x²-x-23|≡2 (mod 3) は x=1,3,4、連続して素数になる最大は k=5 で 3,4,5,6,7",
    _sol20K == [1, 3, 4]
    and max(k for _, k in _runs20) == 5
    and [x for x, k in _runs20 if k == 5] == [3],
    f"x={_sol20K}、長さ4以上の連続は {_runs20}、x=3..7 の値は {[abs(x*x-x-23) for x in range(3,8)]}",
)

_w20 = complex(math.cos(2 * math.pi / 3), math.sin(2 * math.pi / 3))
random.seed(20200225)
_ok20a = True
for _ in range(5000):
    _al = complex(random.uniform(-3, 3), random.uniform(-3, 3))
    _t20 = random.uniform(0, 2 * math.pi)
    _r20 = random.uniform(0.1, 3)
    _be = _al + complex(_r20 * math.cos(_t20), _r20 * math.sin(_t20))
    for _sg in (1, -1):
        _ga = _al + (_be - _al) * complex(math.cos(_sg * math.pi / 3), math.sin(_sg * math.pi / 3))
        if abs(_al**2 + _be**2 + _ga**2 - (_al * _be + _be * _ga + _ga * _al)) > 1e-6:
            _ok20a = False
_R20 = 2.3
_A20p = complex(_R20, 0)
_B20p = _R20 * _w20
_C20p = _R20 * _w20**2
_ok20b = True
for _th20 in (0.0, 0.7, 2.0, 4.5):
    _P20 = _R20 * complex(math.cos(_th20), math.sin(_th20))
    _s2 = abs(_P20 - _A20p) ** 2 + abs(_P20 - _B20p) ** 2 + abs(_P20 - _C20p) ** 2
    _s4 = abs(_P20 - _A20p) ** 4 + abs(_P20 - _B20p) ** 4 + abs(_P20 - _C20p) ** 4
    if abs(_s2 - 6 * _R20**2) > 1e-9 or abs(_s4 - 18 * _R20**4) > 1e-9:
        _ok20b = False
ok(
    "科学大20-2 正三角形 ⟺ α²+β²+γ²=αβ+βγ+γα、ΣAP²=6R²、ΣAP⁴=18R⁴",
    _ok20a and _ok20b,
    f"乱数5000個の正三角形で条件式を確認。R={_R20} で ΣAP²=6R²={6*_R20**2:.6f}、ΣAP⁴=18R⁴={18*_R20**4:.6f}",
)


def _TS20(a, b):
    T = (9 * a / (3 + 2 * a), 0.0, 4 * (3 - a) / (3 + 2 * a))
    S = (0.0, 9 * b / (3 + 2 * b), 4 * (3 - b) / (3 + 2 * b))
    return T, S


def _pow20(a, b):
    P = (0.0, 0.0, -2.0)
    Q = (a, 0.0, 0.0)
    R = (0.0, b, 0.0)
    T, S = _TS20(a, b)
    return math.dist(P, Q) * math.dist(P, T) - math.dist(P, R) * math.dist(P, S)


_ok20c = True
for _i20 in range(1, 30):
    for _j20 in range(1, 30):
        _a20, _b20 = _i20 / 10, _j20 / 10
        _T20, _S20 = _TS20(_a20, _b20)
        if abs(_T20[0] / _a20 + _T20[1] / _b20 - _T20[2] / 2 - 1) > 1e-9:
            _ok20c = False
        if abs(_S20[0] / _a20 + _S20[1] / _b20 - _S20[2] / 2 - 1) > 1e-9:
            _ok20c = False
        _cond = (_a20 - _b20) * (3 * (_a20 + _b20) + 2 * _a20 * _b20 - 8)
        if (abs(_pow20(_a20, _b20)) < 1e-9) != (abs(_cond) < 1e-9):
            _ok20c = False
ok(
    "科学大20-3 T・S の座標、同一円周上 ⟺ a=b または 2ab+3a+3b=8",
    _ok20c,
    f"0.1 刻みの格子で T,S が平面上にあることと、方べきの条件が (a-b)(3(a+b)+2ab-8)=0 と一致することを確認",
)

_ok20d = all(
    abs(
        quad(lambda x: 2 * math.pi * x * math.sin(x) * (1 - math.cos(x)) / math.sqrt(2),
             (n - 1) * math.pi, n * math.pi, 8001)[0]
        - math.sqrt(2) * (8 * n - 3) * math.pi**2 / 4
    )
    < 1e-6
    for n in (1, 3, 5)
)
ok(
    "科学大20-4 断面は面積 2πx sin x の円環、Vₙ=√2(8n-3)π²/4",
    _ok20d,
    f"n=1,3,5 で数値積分と式が一致（n=1 で {math.sqrt(2)*5*math.pi**2/4:.9f}）",
)

_pi20 = Fraction(314159265358979323846264338327950288419716939937510, 10**50)
_c20 = _pi20 / 2


def _ak20(k):
    """a_k=∫₀¹x^(k-1)sin(πx/2)dx を sin の級数から分数で厳密に出す（k⁴a_k の桁落ちを避ける）。"""
    s = Fraction(0)
    for j in range(22):
        s += Fraction((-1) ** j) * _c20 ** (2 * j + 1) / (math.factorial(2 * j + 1) * (k + 2 * j + 1))
    return s


_B20 = -_c20 * _c20
_a20k = _ak20(10000)
ok(
    "科学大20-5 a_(k+2)=4(k+1)/π²·(1-k a_k)、A=1、m=3・n=2・B=-π²/4、p=4・q=3・r=1 で 3π²/4",
    all(abs(float(_ak20(k + 2) - 4 * (k + 1) / _pi20**2 * (1 - k * _ak20(k)))) < 1e-30 for k in (1, 2, 3, 5))
    and abs(float(10000 * _a20k) - 1) < 1e-6
    and abs(float(10000**3 * _a20k - 10000**2 - _B20)) < 5e-3
    and abs(float(10000**4 * _a20k - 10000**3 - 10000 * _B20 - 3 * _c20**2)) < 5e-3,
    f"k=10000 で k·a_k={float(10000*_a20k):.9f}、k³a_k-k²={float(10000**3*_a20k-10000**2):.6f}（-π²/4={float(_B20):.6f}）、k⁴a_k-k³-kB={float(10000**4*_a20k-10000**3-10000*_B20):.6f}（3π²/4={float(3*_c20**2):.6f}）",
)

# ---- 東京科学大2019 ----
random.seed(20190)


def _tri19(h, s, t):
    return (h * h + s * s) + (h * h + t * t) + (t - s) ** 2, 4 * math.sqrt(3) * (0.5 * h * (t - s))


_bad19a = 0
_min19a = 1e9
for _ in range(60000):
    _h = random.uniform(0.01, 5)
    _s = random.uniform(-5, 5)
    _t = random.uniform(_s + 1e-6, _s + 10)
    _L, _R = _tri19(_h, _s, _t)
    if _L < _R - 1e-9:
        _bad19a += 1
    _min19a = min(_min19a, _L - _R)
_h19 = 1.7
_Le, _Re = _tri19(_h19, -math.sqrt(3) * _h19 / 3, math.sqrt(3) * _h19 / 3)


def _tetra19(pts):
    def _ar(P, Q, R):
        u = [Q[i] - P[i] for i in range(3)]
        v = [R[i] - P[i] for i in range(3)]
        cr = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
        return 0.5 * math.sqrt(sum(x * x for x in cr))

    A, B, C, D = pts
    e = [math.dist(B, C), math.dist(C, A), math.dist(A, B), math.dist(A, D), math.dist(B, D), math.dist(C, D)]
    T = _ar(A, B, C) + _ar(A, B, D) + _ar(A, C, D) + _ar(B, C, D)
    return sum(x * x for x in e), 2 * math.sqrt(3) * T


_bad19b = 0
_min19b = 1e9
for _ in range(30000):
    _P = [[random.uniform(-3, 3) for _ in range(3)] for _ in range(4)]
    _L, _R = _tetra19(_P)
    if _L < _R - 1e-9:
        _bad19b += 1
    _min19b = min(_min19b, _L - _R)
_Lr, _Rr = _tetra19([[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]])
ok(
    "科学大19-1 p²+q²+r²≧4√3S（等号は s=-√3h/3, t=√3h/3）、四面体では Σ辺²≧2√3T（等号は正四面体）",
    _bad19a == 0 and abs(_Le - _Re) < 1e-9 and _bad19b == 0 and abs(_Lr - _Rr) < 1e-9,
    f"三角形は乱数6万通りで反例 {_bad19a} 件・最小差 {_min19a:.6f}、等号の s,t で差 {_Le-_Re:.1e}。四面体は乱数3万通りで反例 {_bad19b} 件・最小差 {_min19b:.6f}、正四面体で両辺とも {_Lr:.6f}",
)

_log2 = math.log(2)
_A19 = 5 - 8 * _log2
_B19 = 4 * _log2**2 + 5 * _log2
_f19 = lambda u: 6 * u * math.log(u) + 2.5 - 4 * _log2
_lhs19 = lambda x: quad(lambda y: abs(math.log(y)) * _f19(x * y), 1 / x, 2 / x, 40001)[0]
_ok19b = all(abs(_lhs19(x) - (3 * x * (math.log(x) - 1) + _A19 + _B19 / x)) < 1e-7 for x in (1.0, 1.3, 1.7, 2.0))
ok(
    "科学大19-2 f(x)=6x log x+5/2-4log2、A=5-8log2、B=4(log2)²+5log2",
    _ok19b,
    f"x=1,1.3,1.7,2 で数値積分した左辺と右辺が一致。A={_A19:.9f}、B={_B19:.9f}、x=1.3 で左辺 {_lhs19(1.3):.9f}",
)

_M19 = {}
for _m in range(-20, 21):
    for _n in range(-20, 21):
        _z = complex(_m, _n) / complex(3, 2)
        _M19[(round(_z.real * 13), round(_z.imag * 13))] = True
_nn19 = sorted(u * u + v * v for (u, v) in _M19)
_N19 = lambda r: bisect.bisect_right(_nn19, 169 * r * r + 1e-9)
_good19 = [i / 20000 for i in range(1, 30000) if 10 <= _N19(i / 20000) < 25]
_inside19 = lambda x, y: -1e-9 <= x <= 1 + 1e-9 and -1e-9 <= y <= 1 + 1e-9 and not (x > 0.5 + 1e-9 and y > 0.5 + 1e-9)
_cnt19 = sum(1 for (u, v) in _M19 if _inside19(u / 13, v / 13))
ok(
    "科学大19-3 10≦N(r)<25 は 2√13/13≦r<2√26/13、L字形の領域に入る M の要素は 12 個",
    abs(min(_good19) - 2 / math.sqrt(13)) < 1e-4
    and abs(max(_good19) - 2 * math.sqrt(2) / math.sqrt(13)) < 1e-4
    and _cnt19 == 12,
    f"走査した r の範囲は {min(_good19):.5f}〜{max(_good19):.5f}（2√13/13={2/math.sqrt(13):.6f}、2√26/13={2*math.sqrt(2)/math.sqrt(13):.6f}）、領域内の個数は {_cnt19}",
)


def _dot19(u, v):
    return sum(a * b for a, b in zip(u, v))


def _basis19(nrm):
    vs = []
    for e in ((1, 0, 0), (0, 1, 0), (0, 0, 1)):
        s = _dot19(nrm, nrm)
        w = tuple(Fraction(e[i]) * s - nrm[i] * _dot19(nrm, e) for i in range(3))
        if any(x != 0 for x in w):
            if not vs:
                vs.append(w)
            else:
                a = vs[0]
                cr = (a[1] * w[2] - a[2] * w[1], a[2] * w[0] - a[0] * w[2], a[0] * w[1] - a[1] * w[0])
                if any(x != 0 for x in cr):
                    vs.append(w)
                    break
    return vs[0], vs[1]


def _onplane19(nrm, d):
    for i in range(3):
        if nrm[i] != 0:
            p = [Fraction(0), Fraction(0), Fraction(0)]
            p[i] = Fraction(d) / nrm[i]
            return tuple(p)


def _regions2d19(lines):
    L = sorted(set(lines))
    pts = {}
    for i in range(len(L)):
        for j in range(i + 1, len(L)):
            a1, b1, c1 = L[i]
            a2, b2, c2 = L[j]
            det = a1 * b2 - a2 * b1
            if det == 0:
                continue
            key = ((c1 * b2 - c2 * b1) / det, (a1 * c2 - a2 * c1) / det)
            pts.setdefault(key, set()).update([L[i], L[j]])
    return 1 + len(L) + sum(len(v) - 1 for v in pts.values())


def _regions3d19(planes):
    T = 1
    for k, (nrm, d) in enumerate(planes):
        p0 = _onplane19(nrm, d)
        u, v = _basis19(nrm)
        lines = []
        for (n2, d2) in planes[:k]:
            A, B = _dot19(n2, u), _dot19(n2, v)
            if A == 0 and B == 0:
                continue
            C = Fraction(d2) - _dot19(n2, p0)
            lines.append((Fraction(1), B / A, C / A) if A != 0 else (Fraction(0), Fraction(1), C / B))
        T += _regions2d19(lines)
    return T


_pl19 = set()
for _a in range(-2, 3):
    for _b in range(-2, 3):
        for _c in range(-2, 3):
            if (_a, _b, _c) == (0, 0, 0):
                continue
            for _d in range(-2, 3):
                _g = math.gcd(math.gcd(abs(_a), abs(_b)), math.gcd(abs(_c), abs(_d)))
                _p = (_a // _g, _b // _g, _c // _g, _d // _g) if _g else (_a, _b, _c, _d)
                for _x in _p[:3]:
                    if _x != 0:
                        if _x < 0:
                            _p = (-_p[0], -_p[1], -_p[2], -_p[3])
                        break
                _pl19.add(_p)
_pl19 = sorted(_pl19)
_top19 = {}
for _n4 in (3, 4, 5):
    _seen = set()
    for _ in range(1500 if _n4 == 5 else 6000):
        _ch = random.sample(_pl19, _n4)
        _seen.add(_regions3d19([((Fraction(a), Fraction(b), Fraction(c)), d) for (a, b, c, d) in _ch]))
    _top19[_n4] = sorted(_seen, reverse=True)
_f19max = lambda n: (n**3 + 5 * n + 6) // 6
ok(
    "科学大19-4 最大は (n³+5n+6)/6、2番目は 1 小さい値、3番目は n=4 だけ 12 で他は 2 小さい値",
    all(_top19[n][:2] == [_f19max(n), _f19max(n) - 1] for n in (3, 4, 5))
    and _top19[3][2] == 6
    and _top19[4][2] == 12
    and 13 not in _top19[4]
    and _top19[5][2] == 24,
    f"無作為な平面の組で現れた値（大きい順）は n=3 で {_top19[3][:4]}、n=4 で {_top19[4][:5]}、n=5 で {_top19[5][:4]}",
)

_a19 = Fraction(2**8, 3**4)
_b19 = lambda k: Fraction((k + 1) ** (k + 1)) / (_a19**k * math.factorial(k))
_vals19 = [(_b19(k), k) for k in range(1, 40)]
_Mx19 = max(v for v, _ in _vals19)
_f19dec = lambda x: (x + 1) * math.log(1 + 1 / x)
_xs19 = [0.01 * i for i in range(1, 3000)]
ok(
    "科学大19-5 f(x)=(x+1)log(1+1/x) は減少、max bₖ=3¹¹/2¹⁷ で k=2,3",
    all(_f19dec(_xs19[i]) > _f19dec(_xs19[i + 1]) for i in range(len(_xs19) - 1))
    and _Mx19 == Fraction(3**11, 2**17)
    and [k for v, k in _vals19 if v == _Mx19] == [2, 3],
    f"最大値は {_Mx19}（3¹¹/2¹⁷={Fraction(3**11, 2**17)}）で k={[k for v, k in _vals19 if v == _Mx19]}、比 b_(k+1)/b_k は k=1..6 で {[round(float(_b19(k+1)/_b19(k)), 5) for k in range(1, 7)]}",
)

# ---- 三重大2025（数学②） ----
_ac25 = -1 / math.sqrt(3)
_a25 = complex(1, 0)
_c25 = cmath.exp(1j * math.acos(_ac25))
_b25 = -(_a25 + math.sqrt(3) * _c25) / math.sqrt(2)
ok(
    "三重大25-1(1) OA・OC=-√3/3",
    abs(abs(_b25) - 1) < 1e-12 and abs(_ac25 + math.sqrt(3) / 3) < 1e-15,
    f"その内積から作った OB の大きさは {abs(_b25):.9f}（1 になる）、-√3/3={-math.sqrt(3)/3:.9f}",
)
ok(
    "三重大25-1(2) tan(π/10)tan(2π/5)=1",
    abs(math.tan(math.pi / 10) * math.tan(2 * math.pi / 5) - 1) < 1e-12,
    f"数値は {math.tan(math.pi/10)*math.tan(2*math.pi/5):.12f}",
)
_an25 = lambda n: 3 * 2 ** (n - 1) - 2 * 3**n
_S25 = 0
_ok25c = True
for _n in range(1, 15):
    _S25 += _an25(_n)
    if _S25 != 3**_n + 2 * _an25(_n):
        _ok25c = False
ok(
    "三重大25-1(3) aₙ=3·2^(n-1)-2·3ⁿ",
    _ok25c,
    f"n=1..14 で和が 3ⁿ+2aₙ と一致。a₁..a₅={[_an25(n) for n in range(1, 6)]}",
)
_A1, _B1 = -(2 + math.sqrt(3)), 2 + math.sqrt(3)
_A2, _B2 = -math.sqrt(3), -math.sqrt(3)
_mx25, _mn25 = -9.0, 9.0
_G = 1200
for _i in range(_G + 1):
    _x = -1 + 2 * _i / _G
    for _j in range(_G + 1):
        _y = -1 + 2 * _j / _G
        if _x * _x + _y * _y <= 1 and _y <= _A1 * _x + _B1 and _y >= _A2 * _x + _B2:
            if _x + _y > _mx25:
                _mx25 = _x + _y
            if _x + _y < _mn25:
                _mn25 = _x + _y
ok(
    "三重大25-1(4) 領域は単位円から2つの弓形を除いた形、x+y の最大 √2・最小 -(1+√3)/2",
    abs(_A1 * 1 + _B1) < 1e-12
    and abs(_A1 * math.sqrt(3) / 2 + _B1 - 0.5) < 1e-12
    and abs(_A2 * -1 + _B2) < 1e-12
    and abs(_A2 * -0.5 + _B2 + math.sqrt(3) / 2) < 1e-12
    and 0 < math.sqrt(2) - _mx25 < 2e-3
    and 0 < _mn25 + (1 + math.sqrt(3)) / 2 < 2e-3,
    f"格子走査で最大 {_mx25:.5f}（√2={math.sqrt(2):.5f}）、最小 {_mn25:.5f}（-(1+√3)/2={-(1+math.sqrt(3))/2:.5f}）",
)
_sol25 = set()
for _i in range(72000):
    _t1 = 2 * math.pi * _i / 72000
    _c, _s = math.cos(_t1), math.sin(_t1) - 1
    if abs(_c * _c + _s * _s - 1) < 1e-9:
        _t2 = math.atan2(_s, _c) % (2 * math.pi)
        if _t1 <= _t2 + 1e-12:
            _sol25.add((round(_t1 / math.pi, 4), round(_t2 / math.pi, 4)))
_zs25 = []
for _t1, _t2 in ((math.pi / 6, 11 * math.pi / 6), (5 * math.pi / 6, 7 * math.pi / 6)):
    _z1, _z2 = 2 * cmath.exp(1j * _t1), 3 * cmath.exp(1j * _t2)
    _zs25.append(
        abs(abs(_z1) + abs(_z2) - 5) < 1e-9
        and abs(abs(_z1 * _z2) - 6) < 1e-9
        and abs(_z1 * abs(_z2) - abs(_z1) * _z2 - 6j) < 1e-9
    )
ok(
    "三重大25-1(5) (θ₁,θ₂)=(π/6,11π/6),(5π/6,7π/6)、z₁=±√3+i と対応する z₂",
    sorted(_sol25) == [(0.1667, 1.8333), (0.8333, 1.1667)] and all(_zs25),
    f"全探索で出た (θ₁/π, θ₂/π) は {sorted(_sol25)}、どちらの (z₁,z₂) も3つの条件を満たした",
)

ok(
    "三重大25-2 1-((k-1)/k)ⁿ≧a、n≧log(1-a)/log((k-1)/k)、k=5・a=0.99 で n=21",
    abs(1 - (2 / 3) ** 2 - 5 / 9) < 1e-15
    and abs((2 * 0.43 + 2) / (1 - 2 * 0.43) - 143 / 7) < 1e-12
    and 0.8**20 > 0.01
    and 0.8**21 < 0.01,
    f"k=3,n=2 の確率 {1-(2/3)**2:.6f}（5/9={5/9:.6f}）、log₅2=0.43 での下界 {(2*0.43+2)/(1-2*0.43):.6f}、0.8^20={0.8**20:.6f}・0.8^21={0.8**21:.6f}",
)

_f25 = lambda x: 1 - math.sqrt(1 - (x + 1) ** 2) if x < 0 else 1 - math.sqrt(1 - (x - 1) ** 2)
_mx25b = max(_x * _x + _f25(_x) ** 2 for _x in [-1 + 2 * _i / 200000 for _i in range(200001)])
_volD25 = quad(lambda x: math.pi * _f25(x) ** 2, -1, 1, 200001)[0]
ok(
    "三重大25-3 f''>0 で下に凸、D⊂B、B から D の内部を除いた体積は π²-2π",
    abs(_mx25b - 1) < 1e-12
    and abs(_volD25 - (10 * math.pi / 3 - math.pi**2)) < 1e-6
    and abs((4 * math.pi / 3 - _volD25) - (math.pi**2 - 2 * math.pi)) < 1e-6,
    f"x²+f² の最大は {_mx25b:.12f}、D の体積は数値 {_volD25:.7f}／式 {10*math.pi/3-math.pi**2:.7f}、答え {4*math.pi/3-_volD25:.7f}（π²-2π={math.pi**2-2*math.pi:.7f}）",
)

# ---- 名市大医2025 ----
def _ip25(u, v):
    """|a|=2, |b|=6, a·b=10 のときの内積。u,v は (a,b) の係数。"""
    return u[0] * v[0] * 4 + (u[0] * v[1] + u[1] * v[0]) * 10 + u[1] * v[1] * 36


_OH25 = (Fraction(13, 10), Fraction(-3, 10))
_ON25 = (Fraction(13, 7), Fraction(-3, 7))
_s25 = Fraction(-6, 7)
ok(
    "名市医25-1 OH=(13a-3b)/10、ON=(13a-3b)/7",
    _ip25(_OH25, (Fraction(-1), Fraction(1))) == 0
    and _OH25[0] + _OH25[1] == 1
    and _ON25[0] / _OH25[0] == _ON25[1] / _OH25[1]
    and 1 - _s25 == _ON25[0]
    and _s25 / 2 == _ON25[1],
    f"OH と b-a の内積は {_ip25(_OH25, (Fraction(-1), Fraction(1)))}、OH の係数の和は {_OH25[0]+_OH25[1]}、ON は OH の {_ON25[0]/_OH25[0]} 倍で s={_s25} の AM 上の点と一致",
)

_tie25 = {}
for _m in (2, 3, 4):
    _n = 2 * _m
    _tot = _n * (_n - 1) // 2
    _c = sum(1 for _s in itertools.combinations(range(_n), _m) if 2 * sum(_s) == _tot)
    _tie25[_m] = Fraction(_c, math.comb(_n, _m))
ok(
    "名市医25-2(1) 引き分けの確率は m=2 で 1/3、m=3 で 0、m=4 で 4/35",
    _tie25 == {2: Fraction(1, 3), 3: Fraction(0), 4: Fraction(4, 35)},
    f"全探索の結果は {dict((k, str(v)) for k, v in _tie25.items())}。m=4 で和 14 の4個組は {sum(1 for s in itertools.combinations(range(8), 4) if sum(s) == 14)} 通り",
)

_cert25 = {}
for _m in (3, 4):
    _n = 2 * _m
    _g = _t = 0
    for _a1, _b1, _a2 in itertools.permutations(range(_n), 3):
        _t += 1
        _rest = sorted(set(range(_n)) - {_a1, _b1, _a2})
        _kA = _m - 2
        if _a1 + _a2 + sum(_rest[:_kA]) > _b1 + sum(_rest[_kA:]):
            _g += 1
    _cert25[_m] = Fraction(_g, _t)
ok(
    "名市医25-2(2) A の勝ちが確定している確率は m=3 で 11/60、m=4 で 1/56",
    _cert25 == {3: Fraction(11, 60), 4: Fraction(1, 56)},
    f"最初の3回の取り方をすべて調べた結果は {dict((k, str(v)) for k, v in _cert25.items())}",
)

_ak25 = lambda k: sum(1 for y in range(1, k) for x in range(1, y) if x + y > k)
ok(
    "名市医25-3 a₇=6・a₈=9、a_(2m-1)=(m-1)(m-2)・a_(2m)=(m-1)²、Σ=n(n-1)(4n-5)/6",
    _ak25(7) == 6
    and _ak25(8) == 9
    and all(_ak25(2 * m - 1) == (m - 1) * (m - 2) and _ak25(2 * m) == (m - 1) ** 2 for m in range(1, 15))
    and all(sum(_ak25(k) for k in range(1, 2 * n + 1)) == n * (n - 1) * (4 * n - 5) // 6 for n in range(1, 12)),
    f"全探索の aₖ は k=1..12 で {[_ak25(k) for k in range(1, 13)]}、Σ は n=1..5 で {[sum(_ak25(k) for k in range(1, 2*n+1)) for n in range(1, 6)]}",
)

_R3 = math.sqrt(3)
_ang25 = lambda a, b: math.atan((_R3 / a - _R3 / b) / (1 + 3 / (a * b)))
_c25 = 1.5 * math.log(3)
_t1 = lambda x: _R3 * (x - 1)
_t2 = lambda x: _R3 * math.log(3) + (x - 3) / _R3
_S25 = quad(lambda x: _t1(x) - _R3 * math.log(x), 1, _c25, 100001)[0] + quad(
    lambda x: _t2(x) - _R3 * math.log(x), _c25, 3, 100001
)[0]
ok(
    "名市医25-4 b=3(a+1)/(3-a)、a=1 のとき面積は √3-3√3(log3)²/4",
    all(abs(_ang25(a, 3 * (a + 1) / (3 - a)) - math.pi / 6) < 1e-12 for a in (0.5, 1.0, 2.0, 2.9))
    and abs(_S25 - (_R3 - 3 * _R3 / 4 * math.log(3) ** 2)) < 1e-9,
    f"a=0.5,1,2,2.9 で2接線のなす鋭角はどれも π/6、面積は数値 {_S25:.9f}／式 {_R3-3*_R3/4*math.log(3)**2:.9f}（交点の x は {_c25:.7f}）",
)

# ---- 名市大医2024 ----
_a24 = (1.0, 0.0, 0.0)
_b24 = (0.5, math.sqrt(3) / 2, 0.0)
_c24 = (0.5, math.sqrt(3) / 6, math.sqrt(6) / 3)


def _lin24(*terms):
    r = [0.0, 0.0, 0.0]
    for co, v in terms:
        for i in range(3):
            r[i] += co * v[i]
    return tuple(r)


_dot24 = lambda u, v: sum(x * y for x, y in zip(u, v))
_P24 = _lin24((1 / 3, _a24), (-1, _b24))
_PA24 = tuple(_a24[i] - _P24[i] for i in range(3))
_PB24 = tuple(_b24[i] - _P24[i] for i in range(3))
_G24 = _lin24((1 / 3, _a24), (1 / 3, _b24), (1 / 3, _c24))
_Q24 = _lin24((1 / 3, _a24), (0.25, _c24))
_d1 = tuple(_P24[i] - _G24[i] for i in range(3))
_d2 = tuple(_Q24[i] - _G24[i] for i in range(3))
_cr24 = (
    _d1[1] * _d2[2] - _d1[2] * _d2[1],
    _d1[2] * _d2[0] - _d1[0] * _d2[2],
    _d1[0] * _d2[1] - _d1[1] * _d2[0],
)
_s24 = (7 + 3 * math.sqrt(41)) / 48
_R24 = _lin24((_s24, _a24))
_RP24 = tuple(_P24[i] - _R24[i] for i in range(3))
_RQ24 = tuple(_Q24[i] - _R24[i] for i in range(3))
_sother = 1 / 3 - (3 + math.sqrt(41)) / 16
ok(
    "名市医24-1 OP=a/3-b、OQ=a/3+c/4、OR/OA=(7+3√41)/48",
    all(abs(5 * _P24[i] - (_PA24[i] - 3 * _PB24[i])) < 1e-12 for i in range(3))
    and all(abs(x) < 1e-12 for x in _cr24)
    and abs(_dot24(_RP24, _RQ24)) < 1e-12
    and 0 < _s24 < 1
    and not (0 <= _sother <= 1),
    f"1辺1の正四面体で 5OP-(PA-3PB)=0、Q は直線 GP 上（外積 0）、s={_s24:.7f} で RP・RQ={_dot24(_RP24,_RQ24):.1e}、もう一方の解 {_sother:.7f} は線分 OA 上にない",
)

_bag24 = {"R": Fraction(2, 10), "B": Fraction(4, 10), "W": Fraction(4, 10)}
_dist24 = {}
for _c1, _p1 in _bag24.items():
    for _c2, _p2 in _bag24.items():
        _k = tuple(sorted([_c1, _c2]))
        _dist24[_k] = _dist24.get(_k, Fraction(0)) + _p1 * _p2
_one24 = sum(v for k, v in _dist24.items() if k.count("R") == 1)
_two24 = sum(v for k, v in _dist24.items() if k.count("R") == 2)
_post24 = {k: _dist24[k] * Fraction(k.count("R"), 2) ** 2 for k in _dist24}
_tot24 = sum(_post24.values())
_post24 = {k: v / _tot24 for k, v in _post24.items() if v}
_ans24 = Fraction(0)
for _k, _pk in _post24.items():
    for _ca in ("R", "B"):
        for _cb in _k:
            if {_ca, _cb} == {"R", "B"}:
                _ans24 += _pk * Fraction(1, 2) * Fraction(1, 2)
ok(
    "名市医24-2 赤1個だけ 8/25・赤2個 1/25、条件付きで 2/3 と 1/3、操作4は 5/12",
    _one24 == Fraction(8, 25)
    and _two24 == Fraction(1, 25)
    and _tot24 == Fraction(3, 25)
    and sum(v for k, v in _post24.items() if k.count("R") == 1) == Fraction(2, 3)
    and _post24[("R", "R")] == Fraction(1, 3)
    and _ans24 == Fraction(5, 12),
    f"操作1のあとの分布は {dict((''.join(k), str(v)) for k, v in _dist24.items())}、記録が2回とも赤になる確率は {_tot24}、条件付き分布は {dict((''.join(k), str(v)) for k, v in _post24.items())}、操作4の確率は {_ans24}",
)

_r24 = lambda n: (3**n - 2**n + 4 * n) % 10
_hits24 = [n for n in range(1, 700) if _r24(n) == 7]
ok(
    "名市医24-3 3ⁿ-2ⁿ の余りは周期4で 1,5,9,5、rₙ=7 は 20 ごとに 7,8,9,18、a₁₀₀=498",
    [(3**n - 2**n) % 10 for n in range(1, 9)] == [1, 5, 9, 5, 1, 5, 9, 5]
    and [_r24(n) for n in range(1, 21)] == [5, 3, 1, 1, 1, 9, 7, 7, 7, 5, 3, 3, 3, 1, 9, 9, 9, 7, 5, 5]
    and _hits24[:12] == [7, 8, 9, 18, 27, 28, 29, 38, 47, 48, 49, 58]
    and _hits24[99] == 498,
    f"rₙ は n=1..20 で {[_r24(n) for n in range(1, 21)]}、rₙ=7 の n は {_hits24[:12]}…、100 番目は {_hits24[99]}",
)

_p24v, _q24v = 2 + math.sqrt(3), 1.0
_al24v = math.atan(_q24v / _p24v)
_be24v = _al24v + math.pi
_k24 = math.hypot(_p24v, _q24v)
_S1v = (
    quad(lambda x: _p24v * math.sin(x) - _q24v * math.cos(x), _al24v, math.pi / 2, 20001)[0]
    + quad(lambda x: _p24v * math.sin(x), math.pi / 2, math.pi, 20001)[0]
)
_S2v = (
    quad(lambda x: -_q24v * math.cos(x), math.pi / 2, math.pi, 20001)[0]
    + quad(lambda x: _p24v * math.sin(x) - _q24v * math.cos(x), math.pi, _be24v, 20001)[0]
)
ok(
    "名市医24-4 S₁=√(p²+q²)+p-q、S₂=√(p²+q²)-p+q、α=π/12・β=13π/12",
    abs(_S1v - (_k24 + _p24v - _q24v)) < 1e-7
    and abs(_S2v - (_k24 - _p24v + _q24v)) < 1e-7
    and abs(_S1v / _S2v - (math.sqrt(2) + 1) / (math.sqrt(2) - 1)) < 1e-7
    and abs(_al24v - math.pi / 12) < 1e-12
    and abs(_be24v - 13 * math.pi / 12) < 1e-12,
    f"p=2+√3・q=1 で S₁={_S1v:.9f}（式 {_k24+_p24v-_q24v:.9f}）、S₂={_S2v:.9f}（式 {_k24-_p24v+_q24v:.9f}）、比 {_S1v/_S2v:.9f}（(√2+1)/(√2-1)={(math.sqrt(2)+1)/(math.sqrt(2)-1):.9f}）、α={_al24v:.9f}（π/12={math.pi/12:.9f}）",
)

# ---- 名市大医2023 ----
_an23 = lambda n: 2 * 3 ** (n - 1)
_S23 = 0
_ok23a = True
for _n in range(1, 15):
    _S23 += _an23(_n)
    if _S23 != 3**_n - 1:
        _ok23a = False
_b15 = 3 * 15 * _an23(15)
_T23 = lambda n: Fraction(3 * ((2 * n - 1) * 3**n + 1), 2)
ok(
    "名市医23-1 aₙ=2·3^(n-1)、b₁₅ は9桁、Tₙ=3{(2n-1)3ⁿ+1}/2",
    _ok23a
    and len(str(_b15)) == 9
    and abs(1 + 16 * 0.4771 - 8.6336) < 1e-9
    and all(sum(3 * k * _an23(k) for k in range(1, n + 1)) == _T23(n) for n in range(1, 15)),
    f"n=1..14 で和が 3ⁿ-1 と一致、b₁₅={_b15}（{len(str(_b15))}桁、log₁₀b₁₅=1+16·0.4771={1+16*0.4771:.4f}）、T₁,T₂,T₃={[_T23(n) for n in range(1, 4)]}",
)

_p23 = lambda n: Fraction(3 * n, 3**n)
_q23 = lambda n: Fraction(3**n - 3 * 2**n + 6, 3**n)
_beats23 = lambda x, y: (x - y) % 3 == 1
_ok23b = True
for _n in range(2, 7):
    _w = _ai = 0
    for _h in itertools.product(range(3), repeat=_n):
        _st = set(_h)
        if len(_st) != 2:
            _ai += 1
        else:
            _x, _y = sorted(_st)
            _win = _x if _beats23(_x, _y) else _y
            if _h.count(_win) == 1:
                _w += 1
    if Fraction(_w, 3**_n) != _p23(_n) or Fraction(_ai, 3**_n) != _q23(_n):
        _ok23b = False
_ans23 = _q23(5) * _p23(5) + sum(Fraction(3 * math.comb(5, k), 3**5) * _p23(k) for k in (2, 3, 4))
ok(
    "名市医23-2 pₙ=n/3^(n-1)、qₙ=(3ⁿ-3·2ⁿ+6)/3ⁿ、5人で2回目に決まる確率は 125/729",
    _ok23b and _ans23 == Fraction(125, 729),
    f"n=2..6 で全列挙と式が一致（p₅={_p23(5)}、q₅={_q23(5)}）、2回目に決まる確率は {_ans23}={float(_ans23):.7f}",
)

_A23, _B23, _C23 = (-1, 1, 3), (2, 1, 0), (0, 3, 1)
_D23, _P23 = (5, 1, -3), (5, 3, 5)
_sub23 = lambda u, v: tuple(a - b for a, b in zip(u, v))
_dot23 = lambda u, v: sum(a * b for a, b in zip(u, v))
_cross23 = lambda u, v: (u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0])
_n23 = (2, 1, 2)
_H23 = tuple(_P23[i] - 2 * _n23[i] for i in range(3))


def _vol23(p0, p1, p2, p3):
    return abs(_dot23(_sub23(p1, p0), _cross23(_sub23(p2, p0), _sub23(p3, p0)))) / 6


_ok23c = all(
    abs(_vol23((2 * t + 5, t + 3, 2 * t - 4), _A23, _B23, _C23) / _vol23((2 * u + 3, u - 1, 2 * u), _A23, _C23, _D23) - t / (2 * u))
    < 1e-12
    for t, u in ((1, 1), (2, 3), (0.7, 1.9))
)
ok(
    "名市医23-3 n=(2,1,2)、H(1,1,1)、QABC:RACD=t:2u",
    _dot23(_n23, _sub23(_B23, _A23)) == 0
    and _dot23(_n23, _sub23(_C23, _A23)) == 0
    and _dot23(_n23, _D23) == 5
    and _dot23(_n23, _H23) == 5
    and _cross23(_sub23(_H23, _P23), _n23) == (0, 0, 0)
    and _ok23c,
    f"平面は 2x+y+2z=5 で D も上にある。H={_H23}、PH は n の -2 倍。体積比は (t,u)=(1,1),(2,3),(0.7,1.9) で t/(2u) と一致",
)

_l23 = 3 * math.pi / 4 + 1
_f23 = lambda th: th + 1 - math.pi / 4
_pc23 = lambda th: (
    math.cos(th) + _f23(th) * math.sin(th),
    math.sin(th) - _f23(th) * math.cos(th),
)
_ys23 = [_pc23(math.pi / 4 + i * (math.pi - math.pi / 4) / 20000)[1] for i in range(1, 20001)]
_len23 = 0.0
_prev23 = _pc23(math.pi / 4)
for _i in range(1, 100001):
    _cur23 = _pc23(math.pi / 4 + _i * (math.pi - math.pi / 4) / 100000)
    _len23 += math.dist(_prev23, _cur23)
    _prev23 = _cur23
ok(
    "名市医23-4 糸の全長 3π/4+1、伸開線の長さ (ℓ²-1)/2、全体は 21π²/32+5π/4",
    abs(_pc23(math.pi / 4)[0] - math.sqrt(2)) < 1e-12
    and abs(_pc23(math.pi / 4)[1]) < 1e-12
    and abs(_pc23(math.pi)[0] + 1) < 1e-12
    and abs(_pc23(math.pi)[1] - _l23) < 1e-12
    and min(_ys23) > 0
    and abs(_len23 - (_l23**2 - 1) / 2) < 1e-6
    and abs(_len23 + math.pi / 2 * _l23 - (21 * math.pi**2 / 32 + 5 * math.pi / 4)) < 1e-6,
    f"ℓ={_l23:.7f}、P(π/4)=(√2,0)・P(π)=(-1,ℓ)、π/4<θ≦π の y の最小は {min(_ys23):.1e}（正）、伸開線 {_len23:.7f}（式 {(_l23**2-1)/2:.7f}）、全体 {_len23+math.pi/2*_l23:.7f}（式 {21*math.pi**2/32+5*math.pi/4:.7f}）",
)

# ---- 名市大医2022 ----
_f22 = lambda x: math.log(x) / x
_area22 = quad(lambda x: _f22(x) - math.log(2) / 2, 2, 4, 100001)[0]
ok(
    "名市医22-1 極大 1/e、変曲点 x=e^(3/2)、m^n=n^m は (2,4)、面積は 3(log2)²/2-log2",
    abs(_f22(math.e) - 1 / math.e) < 1e-15
    and abs(_f22(math.exp(1.5)) - 1.5 / math.exp(1.5)) < 1e-15
    and [(m, n) for m in range(1, 60) for n in range(m + 1, 200) if m**n == n**m] == [(2, 4)]
    and abs(_area22 - (1.5 * math.log(2) ** 2 - math.log(2))) < 1e-9,
    f"f(e)={_f22(math.e):.7f}（1/e）、変曲点 x={math.exp(1.5):.7f}・y={_f22(math.exp(1.5)):.7f}、m<n≦199 の全探索は [(2,4)]、面積 {_area22:.7f}（式 {1.5*math.log(2)**2-math.log(2):.7f}）",
)

random.seed(20220)
_ok22b = True
for _ in range(5):
    _A = (random.uniform(0.5, 3), random.uniform(-2, 2))
    _B = (random.uniform(-3, 3), random.uniform(0.5, 3))
    _a = math.hypot(*_A)
    _b = math.hypot(*_B)
    _c = math.dist(_A, _B)
    _k = _a + _b + _c
    _I = ((_b * _A[0] + _a * _B[0]) / _k, (_b * _A[1] + _a * _B[1]) / _k)

    def _dl(P, X, Y):
        return abs((Y[0] - X[0]) * (X[1] - P[1]) - (X[0] - P[0]) * (Y[1] - X[1])) / math.dist(X, Y)

    _r1, _r2, _r3 = _dl(_I, (0, 0), _A), _dl(_I, (0, 0), _B), _dl(_I, _A, _B)
    if max(abs(_r1 - _r2), abs(_r2 - _r3)) > 1e-12:
        _ok22b = False
    _L = (_A[0] / 2, _A[1] / 2)
    _M = (_B[0] / 2, _B[1] / 2)
    _N = ((_A[0] + _B[0]) / 2, (_A[1] + _B[1]) / 2)
    # 直線 IN と直線 LM の交点を連立で解く
    _d1 = (_N[0] - _I[0], _N[1] - _I[1])
    _d2 = (_M[0] - _L[0], _M[1] - _L[1])
    _det = _d1[0] * (-_d2[1]) - (-_d2[0]) * _d1[1]
    _rhs = (_L[0] - _I[0], _L[1] - _I[1])
    _t = (_rhs[0] * (-_d2[1]) - (-_d2[0]) * _rhs[1]) / _det
    _P = (_I[0] + _t * _d1[0], _I[1] + _t * _d1[1])
    _Pf = (
        ((_c + _b - _a) * _A[0] + (_c + _a - _b) * _B[0]) / (4 * _c),
        ((_c + _b - _a) * _A[1] + (_c + _a - _b) * _B[1]) / (4 * _c),
    )
    _AQ = (_a + _c - _b) / 2
    _Q = (_A[0] + _AQ / _c * (_B[0] - _A[0]), _A[1] + _AQ / _c * (_B[1] - _A[1]))
    if math.dist(_P, _Pf) > 1e-12 or math.dist(_Q, (2 * _P[0], 2 * _P[1])) > 1e-12:
        _ok22b = False
ok(
    "名市医22-2 OI=(b·OA+a·OB)/(a+b+c)、OP={(b+c-a)OA+(a+c-b)OB}/(4c)、OQ=2OP",
    _ok22b,
    "乱数の三角形5通りで、内心から3辺までの距離が等しく、IN と LM の交点が式と一致し、接点 Q が 2OP に一致した",
)

_cnt22 = {h: Fraction(math.comb(10, h), 2**10) for h in range(11)}
_Pc22 = ["A", "D", "C", "B"]
_Qc22 = ["B", "C", "D", "A"]
_Pp22 = {}
_Qp22 = {}
for _h, _pr in _cnt22.items():
    _Pp22[_Pc22[(10 + _h) % 4]] = _Pp22.get(_Pc22[(10 + _h) % 4], Fraction(0)) + _pr
    _Qp22[_Qc22[(10 + _h) % 4]] = _Qp22.get(_Qc22[(10 + _h) % 4], Fraction(0)) + _pr
_same22 = sum(_Pp22[v] * _Qp22[v] for v in "ABCD")
ok(
    "名市医22-3 P は A1/4・B17/64・C1/4・D15/64、異なる頂点は 3/4",
    _Pp22 == {"A": Fraction(1, 4), "B": Fraction(17, 64), "C": Fraction(1, 4), "D": Fraction(15, 64)}
    and _Qp22 == {"A": Fraction(17, 64), "B": Fraction(1, 4), "C": Fraction(15, 64), "D": Fraction(1, 4)}
    and 1 - _same22 == Fraction(3, 4),
    f"P の分布 {dict((k, str(v)) for k, v in sorted(_Pp22.items()))}、Q の分布 {dict((k, str(v)) for k, v in sorted(_Qp22.items()))}、同じ頂点 {_same22}・異なる頂点 {1-_same22}",
)

_terms22 = []
for _k in range(1, 14):
    _terms22 += [Fraction(1, 2 ** (_k - 1))] * (_k + 2 ** (_k - 1))
_Sk22 = lambda k: Fraction(k + 2 ** (k - 1), 2 ** (k - 1))
ok(
    "名市医22-4 a₅₀₀=1/256、Sₖ=1+k/2^(k-1)、ΣSᵢ=k+4-(k+2)/2^(k-1)、先頭2022項の和は 1907/128",
    _terms22[499] == Fraction(1, 256)
    and all(_Sk22(k) == 1 + Fraction(k, 2 ** (k - 1)) for k in range(1, 12))
    and all(sum(_Sk22(i) for i in range(1, k + 1)) == k + 4 - Fraction(k + 2, 2 ** (k - 1)) for k in range(1, 12))
    and sum(_terms22[:2022]) == Fraction(1907, 128),
    f"実際に並べた a₅₀₀={_terms22[499]}、先頭2022項の和は {sum(_terms22[:2022])}={float(sum(_terms22[:2022])):.7f}",
)

# ---- 名市大医2021 ----
_e21 = math.e
_ok21a = all(
    abs(abs(math.log(x)) + abs(math.log(y)) - 1) < 1e-12
    for x, y in ((1.5, _e21 / 1.5), (1.5, 1.5 / _e21), (0.5, _e21 * 0.5), (0.5, 1 / (_e21 * 0.5)))
)
_s21a = quad(lambda x: _e21 * x - 1 / (_e21 * x), 1 / _e21, 1, 50001)[0]
_s21b = quad(lambda x: _e21 / x - x / _e21, 1, _e21, 50001)[0]
ok(
    "名市医21-1 4つの枝（xy=e, y=x/e, y=ex, xy=1/e）、面積は e-1/e",
    _ok21a and abs(_s21a + _s21b - (_e21 - 1 / _e21)) < 1e-7,
    f"4つの枝の上で |log x|+|log y|=1 を確認。面積は {_s21a:.7f}+{_s21b:.7f}={_s21a+_s21b:.7f}（e-1/e={_e21-1/_e21:.7f}）",
)

_ok21b = True
for _n in range(3, 20):
    _oa, _ob, _ab = 2 * _n + 1, 2 * _n - 1, 2 * _n
    _cB = (_ob**2 + _ab**2 - _oa**2) / (2 * _ob * _ab)
    _cO = (_oa**2 + _ob**2 - _ab**2) / (2 * _oa * _ob)
    _cA = (_oa**2 + _ab**2 - _ob**2) / (2 * _oa * _ab)
    if min(_cO, _cA, _cB) <= 0 or abs(_cB - (_n - 2) / (2 * _n - 1)) > 1e-12:
        _ok21b = False
    if abs((_n + 2) / (2 * _n) * _ab - (_n + 2)) > 1e-12:
        _ok21b = False
    if _oa**2 - (_n + 2) ** 2 != 3 * (_n**2 - 1):
        _ok21b = False
_sq21 = [n for n in range(3, 200) if math.isqrt(3 * (n * n - 1)) ** 2 == 3 * (n * n - 1)]
ok(
    "名市医21-2 鋭角三角形、t=(n+2)/(2n)、|OP|²=3(n²-1) で最小の n は 7",
    _ok21b and _sq21[0] == 7 and math.isqrt(3 * (7 * 7 - 1)) == 12,
    f"n=3..19 で3つの cos がすべて正、cos∠B=(n-2)/(2n-1)、AP=n+2、|OP|²=3(n²-1)。平方数になる n は {_sq21[:3]} で最小は {_sq21[0]}（|OP|={math.isqrt(3*48)}）",
)

_a21 = [None, Fraction(2)]
for _n in range(1, 40):
    _a21.append(_a21[_n] * Fraction(_n, _n + 2))
ok(
    "名市医21-3 aₙ=4/(n(n+1))、Σ=4",
    all(_a21[n] == Fraction(4, n * (n + 1)) for n in range(1, 40))
    and sum(_a21[1:41]) == 4 * (1 - Fraction(1, 41)),
    f"漸化式から出した a₁..a₅ は {[str(_a21[n]) for n in range(1, 6)]}、第40項までの和は {float(sum(_a21[1:41])):.7f}（4 に近づく）",
)


def _play21(seq):
    table = []
    score = [0, 0]
    turn = 0
    i = 0
    while i < len(seq):
        table.append(seq[i])
        table.append(seq[i + 1])
        i += 2
        pairs = [v for v in set(table) if table.count(v) == 2]
        if pairs:
            for v in pairs:
                table.remove(v)
                table.remove(v)
                score[turn] += 2
        else:
            turn = 1 - turn
    return score


_res21 = {}
for _n in (2, 3):
    _cards = [v for v in range(1, _n + 1) for _ in range(2)]
    _tot = _b = _d = 0
    for _perm in itertools.permutations(range(2 * _n)):
        _s = _play21([_cards[j] for j in _perm])
        _tot += 1
        if _s[1] > _s[0]:
            _b += 1
        elif _s[0] == _s[1]:
            _d += 1
    _res21[_n] = (Fraction(_b, _tot), Fraction(_d, _tot))
random.seed(20210)
_cards4 = [v for v in range(1, 5) for _ in range(2)]
_T21 = 200000
_b4 = _d4 = 0
for _ in range(_T21):
    random.shuffle(_cards4)
    _s = _play21(_cards4)
    if _s[1] > _s[0]:
        _b4 += 1
    elif _s[0] == _s[1]:
        _d4 += 1
ok(
    "名市医21-4 P(2)=2/3、P(3)=14/15、P(4)=74/105、Q(4)=2/35",
    _res21[2] == (Fraction(2, 3), Fraction(0))
    and _res21[3] == (Fraction(14, 15), Fraction(0))
    and abs(_b4 / _T21 - 74 / 105) < 0.005
    and abs(_d4 / _T21 - 2 / 35) < 0.005,
    f"全列挙で P(2)={_res21[2][0]}・P(3)={_res21[3][0]}（引き分けはどちらも {_res21[2][1]}）、n=4 はモンテカルロ {_T21} 回で B の勝ち {_b4/_T21:.5f}（74/105={74/105:.5f}）・引き分け {_d4/_T21:.5f}（2/35={2/35:.5f}）",
)

# ---- 名市大医2020 ----
_z20 = complex(1, 0)
_ok20a = True
_T20sum = 0.0
_T20 = []
for _n in range(1, 12):
    _w20 = complex(math.sqrt(2 - 2 / 9**_n), math.sqrt(2) / 3**_n)
    if abs(abs(_w20) - math.sqrt(2)) > 1e-12 or abs(_w20.imag / abs(_w20) - 1 / 3**_n) > 1e-12:
        _ok20a = False
    if abs(abs(_z20) - 2 ** ((_n - 1) / 2)) > 1e-9:
        _ok20a = False
    _z2 = _w20 * _z20
    _t = 0.5 * abs(_z20) * abs(_z2) * (_w20.imag / abs(_w20))
    if abs(_t - (1 / (2 * math.sqrt(2))) * (2 / 3) ** _n) > 1e-12:
        _ok20a = False
    _T20.append(_t)
    _T20sum += _t
    _z20 = _z2
ok(
    "名市医20-1 |z_(n+1)/z_n|=√2、sinθₙ=3^(-n)、ΣTₙ=√2/2",
    _ok20a and abs(_T20sum - math.sqrt(2) / 2) < 0.01,
    f"n=1..11 で比の大きさは √2、sinθₙ=3^(-n)、|zₙ|=2^((n-1)/2)。T₁,T₂,T₃={[round(t,7) for t in _T20[:3]]}、第11項までの和 {_T20sum:.7f}（√2/2={math.sqrt(2)/2:.7f}）",
)

_p20 = [Fraction(1)]
for _n in range(1, 31):
    _p20.append(Fraction(5, 8) * _p20[-1] + Fraction(1, 8))
ok(
    "名市医20-2 Pₙ=1/3+(2/3)(5/8)ⁿ、極限は 1/3",
    all(_p20[n] == Fraction(1, 3) + Fraction(2, 3) * Fraction(5, 8) ** n for n in range(31))
    and abs(float(_p20[30]) - 1 / 3) < 1e-6,
    f"P₁,P₂,P₃={[float(_p20[n]) for n in (1, 2, 3)]}、P₁₀={float(_p20[10]):.9f}、P₃₀={float(_p20[30]):.9f}（1/3 に近づく）",
)

_al, _be, _ga = 2.0, 3.0, 5.0
_a20 = (_al, 0.0, 0.0)
_b20 = (0.0, _be, 0.0)
_c20v = (0.0, 0.0, _ga)
_den20 = _be**2 * _ga**2 + _ga**2 * _al**2 + _al**2 * _be**2
_H20 = tuple(
    (_be**2 * _ga**2 * _a20[i] + _ga**2 * _al**2 * _b20[i] + _al**2 * _be**2 * _c20v[i]) / _den20
    for i in range(3)
)
_sub20 = lambda u, v: tuple(x - y for x, y in zip(u, v))
_dot20 = lambda u, v: sum(x * y for x, y in zip(u, v))
_cr20 = lambda u, v: (u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0])
_S20 = math.sqrt(sum(t * t for t in _cr20(_sub20(_b20, _a20), _sub20(_c20v, _a20)))) / 2
ok(
    "名市医20-3 OH=(β²γ²a+γ²α²b+α²β²c)/(β²γ²+γ²α²+α²β²)、△ABC=√(α²β²+β²γ²+γ²α²)/2",
    abs(_H20[0] / _al + _H20[1] / _be + _H20[2] / _ga - 1) < 1e-12
    and abs(_dot20(_H20, _sub20(_b20, _a20))) < 1e-12
    and abs(_dot20(_H20, _sub20(_c20v, _a20))) < 1e-12
    and abs(_S20 - 0.5 * math.sqrt(_al**2 * _be**2 + _be**2 * _ga**2 + _ga**2 * _al**2)) < 1e-12,
    f"α,β,γ=2,3,5 で OH={tuple(round(t,7) for t in _H20)}、平面 ABC 上（x/α+y/β+z/γ=1）、AB・AC と直交。外積から出した面積 {_S20}（式 {0.5*math.sqrt(_al**2*_be**2+_be**2*_ga**2+_ga**2*_al**2)}）",
)

random.seed(20200)
_ok20d = True
for _ in range(6):
    _th = random.uniform(0, 2 * math.pi)
    _A = (2 * math.sqrt(2) * math.cos(_th), 1.5)
    _B = (0.0, 1.5 + 2 * math.sqrt(2) * math.sin(_th))
    _P = (_A[0] / 4 + 3 * _B[0] / 4, _A[1] / 4 + 3 * _B[1] / 4)
    if abs(2 * _P[0] ** 2 + (2 / 9) * (_P[1] - 1.5) ** 2 - 1) > 1e-12:
        _ok20d = False
_d20 = lambda x: 3 * math.sqrt(max(0.0, 1 - 2 * x * x)) / math.sqrt(2)
_V20 = 2 * math.pi * (
    quad(lambda x: (1.5 + _d20(x)) ** 2, 0, 0.5, 100001)[0]
    + quad(lambda x: 6 * _d20(x), 0.5, 1 / math.sqrt(2), 100001)[0]
)
ok(
    "名市医20-4 C は 2x²+(2/9)(y-3/2)²=1、回転体の体積は 15π/4+27π²/8",
    _ok20d and abs(_V20 - (15 * math.pi / 4 + 27 * math.pi**2 / 8)) < 1e-5,
    f"乱数6通りの A,B で P が楕円上にあることを確認。体積は数値 {_V20:.7f}／式 {15*math.pi/4+27*math.pi**2/8:.7f}",
)

# ---- 名市大医2019 ----
_f19 = lambda x: 2 * math.log(x) / x
_F19 = lambda x: math.log(x) ** 2


def _S19(a):
    if a >= 1:
        return _F19(2 * a) - _F19(a)
    if 2 * a <= 1:
        return _F19(a) - _F19(2 * a)
    return _F19(a) + _F19(2 * a)


_ok19a = all(
    abs(quad(lambda x: abs(_f19(x)), a, 2 * a, 20001)[0] - _S19(a)) < 1e-7
    for a in (0.3, 0.6, 1 / math.sqrt(2), 0.9, 1.5)
)
_best19 = min((0.001 * i for i in range(1, 3000)), key=_S19)
ok(
    "名市医19-1 S(a) の場合分け、最小は a=1/√2 で (log2)²/2",
    _ok19a and abs(_best19 - 1 / math.sqrt(2)) < 1e-3 and abs(_S19(_best19) - math.log(2) ** 2 / 2) < 1e-6,
    f"a=0.3,0.6,1/√2,0.9,1.5 で数値積分と式が一致。0.001 刻みの最小は a={_best19:.3f}（1/√2={1/math.sqrt(2):.6f}）で S={_S19(_best19):.7f}（(log2)²/2={math.log(2)**2/2:.7f}）",
)

_mn19 = [(m, n) for m in range(-4, 5) for n in range(-4, 5) if m and n and 1 <= m * n <= 4]
_th19 = sorted({round(math.degrees(math.acos(math.copysign(math.sqrt(m * n) / 2, m))), 6) for m, n in _mn19})
_q19 = sorted({(m, round(math.sqrt(max(0.0, 4 * m / n - m * m)), 9)) for m, n in _mn19 if 4 * m / n - m * m >= -1e-12})
ok(
    "名市医19-2 θ は8通り、q は16点",
    len(_mn19) == 16
    and _th19 == [0.0, 30.0, 45.0, 60.0, 120.0, 135.0, 150.0, 180.0]
    and len(_q19) == 16,
    f"(m,n) の組は {len(_mn19)} 個、θ（度）は {_th19}、q の点は {len(_q19)} 個で x 座標は ±1,±2,±3,±4",
)

_deg19 = {1: 0, 2: 30, 3: 75, 4: 135, 5: 210, 6: 300}
_A19 = {k: (math.cos(math.radians(d)), math.sin(math.radians(d))) for k, d in _deg19.items()}


def _right19(t):
    for p in itertools.permutations(t):
        v1 = (_A19[p[1]][0] - _A19[p[0]][0], _A19[p[1]][1] - _A19[p[0]][1])
        v2 = (_A19[p[2]][0] - _A19[p[0]][0], _A19[p[2]][1] - _A19[p[0]][1])
        if abs(v1[0] * v2[0] + v1[1] * v2[1]) < 1e-9:
            return True
    return False


_rt19 = [t for t in itertools.combinations(range(1, 7), 3) if _right19(t)]
_cnt19 = {"tri": Fraction(0), "rt": Fraction(0), "has": Fraction(0)}


def _rec19(seq, prob):
    for d in range(1, 7):
        p = prob * Fraction(1, 6)
        s = seq + [d]
        if d in seq:
            m = len(s)
            if m == 4 and d == s[0]:
                _cnt19["tri"] += p
                if {2, 5} <= set(s[:3]):
                    _cnt19["rt"] += p
            if m >= 4 and d == s[m - 4] and {2, 5} <= set(s[m - 4 : m - 1]):
                _cnt19["has"] += p
        else:
            _rec19(s, p)


_rec19([], Fraction(1))
ok(
    "名市医19-3 6点は単位円周上で直角は A₂A₅ が直径のときだけ、確率は 5/54・1/54・61/1944",
    abs(_A19[3][0] - (math.sqrt(3) - 1) / (2 * math.sqrt(2))) < 1e-12
    and _rt19 == [(1, 2, 5), (2, 3, 5), (2, 4, 5), (2, 5, 6)]
    and _cnt19["tri"] == Fraction(5, 54)
    and _cnt19["rt"] == Fraction(1, 54)
    and _cnt19["has"] == Fraction(61, 1944),
    f"直角三角形になる3点組は {_rt19}。全列挙の確率は 三角形 {_cnt19['tri']}、直角三角形 {_cnt19['rt']}、三角形を含む {_cnt19['has']}={float(_cnt19['has']):.7f}",
)

_a19 = [None, 1]
for _n in range(1, 30000):
    _a19.append(_a19[_n] - 1 if _a19[_n] > 0 else _n)
_n1 = next(n for n in range(1, 30000) if _a19[n] == 10000)
_s19 = 0
for _n in range(1, 30000):
    _s19 += _a19[_n]
    if _s19 >= 10000:
        _n2, _S2 = _n, _s19
        break
ok(
    "名市医19-4 aₙ=10000 の最小は n=14575、Sₙ≧10000 の最小は n=213",
    _n1 == 14575
    and _n2 == 213
    and _S2 == 10020
    and [n for n in range(1, 400) if _a19[n] == 0] == [2, 5, 11, 23, 47, 95, 191, 383],
    f"先頭は {_a19[1:13]}、aₙ=0 となる n は {[n for n in range(1, 400) if _a19[n] == 0]}、aₙ=10000 の最小 n={_n1}、Sₙ≧10000 の最小 n={_n2}（S={_S2}）",
)

# ---- 名工大2024 ----
_f24 = lambda x: math.sqrt(x) * math.log(x)
_F24 = lambda x: (2 / 9) * x**1.5 * (3 * math.log(x) - 2)
_g24 = lambda x: (math.log(x) + 2) / (2 * math.sqrt(x))
_h24 = lambda t: math.log(t) + 2 * math.sqrt(t) + 2
_lo24, _hi24 = 1e-14, 10.0
for _ in range(200):
    _mid = (_lo24 + _hi24) / 2
    if _h24(_mid) < 0:
        _lo24 = _mid
    else:
        _hi24 = _mid
_S24 = quad(_f24, 1, math.e**2, 100001)[0]
ok(
    "名工大24-1 原始関数 2x^(3/2)(3logx-2)/9、最小 -2/e、変曲点 (1,0)、直交する接線は1本、面積 (8e³+4)/9",
    all(abs((_F24(x + 1e-6) - _F24(x - 1e-6)) / 2e-6 - _f24(x)) < 1e-7 for x in (0.5, 1.0, 2.0, 7.389))
    and abs(_f24(math.exp(-2)) + 2 / math.e) < 1e-12
    and abs(-math.log(0.5) / (4 * 0.5**1.5)) > 0
    and abs(_g24(_lo24) + 1) < 1e-9
    and abs(_S24 - (8 * math.e**3 + 4) / 9) < 1e-6,
    f"最小 f(e^-2)={_f24(math.exp(-2)):.7f}（-2/e={-2/math.e:.7f}）、接点の方程式の解は t={_lo24:.7f} の1つで f'={_g24(_lo24):.9f}、面積 {_S24:.7f}（(8e³+4)/9={(8*math.e**3+4)/9:.7f}）",
)

_seq24 = []
for _m in range(1, 40):
    for _k in range(1, 2 * _m):
        _seq24.append(_m * 2 ** (_k - 1))
_T24 = lambda m: m * (2 ** (2 * m - 1) - 1)
_S24m = lambda m: Fraction(2 * ((3 * m - 1) * 4**m + 1), 9) - Fraction(m * (m + 1), 2)
ok(
    "名工大24-2 a₇₀=288、aₙ=24 は n=8,28,123,530、Tₘ=m(2^(2m-1)-1)、Sₘ の式",
    _seq24[69] == 288
    and [i + 1 for i, v in enumerate(_seq24[:1000]) if v == 24] == [8, 28, 123, 530]
    and all(sum(m * 2 ** (k - 1) for k in range(1, 2 * m)) == _T24(m) for m in range(1, 12))
    and all(sum(_T24(i) for i in range(1, m + 1)) == _S24m(m) for m in range(1, 12)),
    f"先頭は {_seq24[:9]}、a₇₀={_seq24[69]}、24 の出る位置は {[i+1 for i,v in enumerate(_seq24[:1000]) if v == 24]}、T₁,T₂,T₃={[_T24(m) for m in range(1,4)]}、S₁,S₂,S₃={[_S24m(m) for m in range(1,4)]}",
)

_x24 = lambda t: math.cos(t) + math.log(math.tan(t / 2))
_dx24 = lambda t: math.cos(t) ** 2 / math.sin(t)
_L24 = quad(lambda t: math.cos(t) / math.sin(t), math.pi / 6, math.pi / 2, 50001)[0]
_A24 = -quad(lambda t: _x24(t) * math.cos(t), math.pi / 3, math.pi / 2, 50001)[0]
_pq24 = []
for _t in (0.3, 0.9, 1.4):
    _Qx = _x24(_t) - math.cos(_t)
    _pq24.append(math.hypot(_x24(_t) - _Qx, math.sin(_t)))
ok(
    "名工大24-3 dx/dθ=cos²θ/sinθ、PQ=1、L=log2、S=π/12+√3/8-√3log3/4",
    all(abs((_x24(t + 1e-7) - _x24(t - 1e-7)) / 2e-7 - _dx24(t)) < 1e-6 for t in (0.2, 0.8, 1.5))
    and all(abs(v - 1) < 1e-10 for v in _pq24)
    and abs(_L24 - math.log(2)) < 1e-9
    and abs(_A24 - (math.pi / 12 + math.sqrt(3) / 8 - math.sqrt(3) / 4 * math.log(3))) < 1e-9,
    f"θ=0.3,0.9,1.4 で PQ={[round(v,12) for v in _pq24]}、長さ {_L24:.7f}（log2={math.log(2):.7f}）、面積 {_A24:.7f}（式 {math.pi/12+math.sqrt(3)/8-math.sqrt(3)/4*math.log(3):.7f}）",
)

_ab24, _bc24, _ca24 = 3.0, 2.5, -7 / 5
_a24v = (2.0, 0.0, 0.0)
_b24x = _ab24 / 2
_b24y = math.sqrt(9 - _b24x**2)
_b24v = (_b24x, _b24y, 0.0)
_c24x = _ca24 / 2
_c24y = (_bc24 - _b24x * _c24x) / _b24y
_c24z = math.sqrt(14 - _c24x**2 - _c24y**2)
_c24v = (_c24x, _c24y, _c24z)
_sub24 = lambda u, v: tuple(x - y for x, y in zip(u, v))
_dot24v = lambda u, v: sum(x * y for x, y in zip(u, v))
_nrm24 = lambda u: math.sqrt(_dot24v(u, u))
# 平面 ABC 上に OAC を折り出す
_u24 = _sub24(_c24v, _a24v)
_u24 = tuple(x / _nrm24(_u24) for x in _u24)
_w24 = _sub24((0.0, 0.0, 0.0), _a24v)
_par24 = _dot24v(_w24, _u24)
_perp24 = tuple(_w24[i] - _par24 * _u24[i] for i in range(3))
_r24 = _nrm24(_perp24)
_v24 = _sub24(_b24v, _a24v)
_v24 = tuple(_v24[i] - _dot24v(_v24, _u24) * _u24[i] for i in range(3))
_v24 = tuple(x / _nrm24(_v24) for x in _v24)
_Op24 = tuple(_a24v[i] + _par24 * _u24[i] - _r24 * _v24[i] for i in range(3))
_to2 = lambda P: (_dot24v(_sub24(P, _a24v), _u24), _dot24v(_sub24(P, _a24v), _v24))


def _circ24(p, q, r):
    ax, ay = p
    bx, by = q
    cx, cy = r
    d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
    ux = ((ax**2 + ay**2) * (by - cy) + (bx**2 + by**2) * (cy - ay) + (cx**2 + cy**2) * (ay - by)) / d
    uy = ((ax**2 + ay**2) * (cx - bx) + (bx**2 + by**2) * (ax - cx) + (cx**2 + cy**2) * (bx - ax)) / d
    return (ux, uy), math.hypot(ax - ux, ay - uy)


_ctr24, _rad24 = _circ24(_to2(_a24v), _to2(_b24v), _to2(_c24v))
_d2o24 = math.hypot(_to2(_Op24)[0] - _ctr24[0], _to2(_Op24)[1] - _ctr24[1])
_DG24 = lambda t: _nrm24(
    tuple(
        ((1 - t) * _a24v[i] + t * _b24v[i] + _c24v[i]) / 3 - (2 * _a24v[i] + _b24v[i]) / 3
        for i in range(3)
    )
)
_best24 = min((0.0001 * i for i in range(0, 10001)), key=_DG24)
ok(
    "名工大24-4 a·b=3、b·c=5/2、c·a=-7/5、DG を最小にする t=11/70",
    abs(_nrm24(_sub24(_b24v, _a24v)) - math.sqrt(7)) < 1e-12
    and abs(_nrm24(_sub24(_c24v, _b24v)) - 3 * math.sqrt(2)) < 1e-12
    and abs(_nrm24(_sub24(_Op24, _a24v)) - 2) < 1e-9
    and abs(_nrm24(_sub24(_Op24, _c24v)) - math.sqrt(14)) < 1e-9
    and abs(_d2o24 - _rad24) < 1e-9
    and abs(_best24 - 11 / 70) < 2e-4,
    f"c·a=-7/5 で作った四面体は AB=√7・BC=3√2 を満たし、折り出した O' は O'A=2・O'C=√14 で外接円上（距離 {_d2o24:.7f}／半径 {_rad24:.7f}）。DG を最小にする t は走査で {_best24:.5f}（11/70={11/70:.7f}）",
)

# ---- 名工大2023 ----
_X23 = lambda t: t - 2 * math.sin(t)
_Y23 = lambda t: 2 - 2 * math.cos(t)
_N23 = 200000
_pts23 = [(_X23(2 * math.pi * i / _N23), _Y23(2 * math.pi * i / _N23)) for i in range(_N23 + 1)]
_pts23.append((0.0, 0.0))
_A23 = 0.0
for _i in range(len(_pts23) - 1):
    _A23 += _pts23[_i][0] * _pts23[_i + 1][1] - _pts23[_i + 1][0] * _pts23[_i][1]
_A23 = abs(_A23) / 2
_cross23 = sum(
    1
    for i in range(1, 2000)
    if abs(2 * math.pi * i / 2000 - (2 * math.pi - 2 * math.pi * i / 2000)) > 1e-9
    and abs(_X23(2 * math.pi * i / 2000) - _X23(2 * math.pi - 2 * math.pi * i / 2000)) < 1e-9
)
_V23 = math.pi * quad(lambda t: _Y23(t) ** 2 * (1 - 2 * math.cos(t)), 0, 2 * math.pi, 200001)[0]
ok(
    "名工大23-1 x の範囲 [π/3-√3, 5π/3+√3]、面積 8π、体積 28π²",
    abs(_X23(math.pi / 3) - (math.pi / 3 - math.sqrt(3))) < 1e-12
    and abs(_X23(5 * math.pi / 3) - (5 * math.pi / 3 + math.sqrt(3))) < 1e-12
    and _cross23 == 0
    and abs(_A23 - 8 * math.pi) < 1e-5
    and abs(_V23 - 28 * math.pi**2) < 1e-5,
    f"x の最小 {_X23(math.pi/3):.7f}・最大 {_X23(5*math.pi/3):.7f}、自己交差 {_cross23} 件、面積 {_A23:.7f}（8π={8*math.pi:.7f}）、体積 {_V23:.7f}（28π²={28*math.pi**2:.7f}）",
)

_a23 = {1: 1}
for _n in range(1, 120):
    _a23[2 * _n] = 3 * _a23[2 * _n - 1] - _n
    _a23[2 * _n + 1] = _a23[2 * _n] + 1
_b23 = lambda n: Fraction(3**n + 1, 2)
_f23 = lambda n: Fraction(3 ** (n + 1) + 2 * n + 1, 4)
ok(
    "名工大23-2 a₅=8、bₙ=(3ⁿ+1)/2、a_(2n+1)=(3^(n+1)+2n+1)/4、a₁₉₉ は48桁",
    _a23[5] == 8
    and all(_a23[2 * n + 1] - _a23[2 * n - 1] == _b23(n) for n in range(1, 50))
    and all(_a23[2 * n + 1] == _f23(n) for n in range(0, 90))
    and len(str(_a23[199])) == 48
    and 47 < 100 * 0.4771 - 2 * 0.3010 < 48,
    f"a₁..a₅={[_a23[i] for i in range(1,6)]}、a₁₉₉ は {len(str(_a23[199]))} 桁で log₁₀a₁₉₉={math.log10(_a23[199]):.7f}（概算 {100*0.4771-2*0.3010:.3f}）",
)

_A23v = (5.0, 0.0, 0.0)
_B23v = (1.0, math.sqrt(48), 0.0)
_c23x = 20 / 5
_c23y = (44 - _B23v[0] * _c23x) / _B23v[1]
_c23z = math.sqrt(64 - _c23x**2 - _c23y**2)
_C23v = (_c23x, _c23y, _c23z)
_sub23 = lambda u, v: tuple(x - y for x, y in zip(u, v))
_dot23 = lambda u, v: sum(x * y for x, y in zip(u, v))
_nrm23 = lambda u: math.sqrt(_dot23(u, u))
_H23 = (19 / 30 * 5 + 5 / 6 * 1, 5 / 6 * math.sqrt(48), 0.0)
# ℓ：B を x 軸について折り返した点と A を通る直線
_Bp23 = (1.0, -math.sqrt(48), 0.0)
_d23 = _sub23(_Bp23, _A23v)
# t*H = A + v*d を解く
_det23 = _H23[0] * (-_d23[1]) - (-_d23[0]) * _H23[1]
_t23 = (_A23v[0] * (-_d23[1]) - (-_d23[0]) * _A23v[1]) / _det23
ok(
    "名工大23-3 a·b=5・b·c=44・c·a=20、OH=19a/30+5b/6、OK/OA=1/5、OD/OH=15/2",
    abs(_nrm23(_sub23(_B23v, _A23v)) - 8) < 1e-12
    and abs(_nrm23(_sub23(_C23v, _B23v)) - 5) < 1e-9
    and abs(_nrm23(_sub23(_C23v, _A23v)) - 7) < 1e-9
    and abs(_dot23(_sub23(_C23v, _H23), _A23v)) < 1e-9
    and abs(_dot23(_sub23(_C23v, _H23), _B23v)) < 1e-9
    and abs(_dot23(_B23v, _A23v) / _dot23(_A23v, _A23v) - 0.2) < 1e-12
    and abs(_t23 - 7.5) < 1e-9,
    f"6辺は 5,7,8,{_nrm23(_sub23(_B23v,_A23v)):.0f},{_nrm23(_sub23(_C23v,_B23v)):.0f},{_nrm23(_sub23(_C23v,_A23v)):.0f}。H={tuple(round(x,6) for x in _H23)} で CH は平面 OAB に垂直、OK/OA={_dot23(_B23v,_A23v)/_dot23(_A23v,_A23v)}、OD/OH={_t23:.7f}",
)

_ff23 = lambda x: (2 * x**3 + x**2 - 4 * x - 3) / (x**2 - 3)
_S23b = quad(_ff23, -1, 1.5, 100001)[0]


def _cnt23(m):
    roots = {0.0}
    if abs(m - 2) > 1e-12:
        r = (4 - 3 * m) / (2 - m)
        if r > 1e-12:
            roots |= {math.sqrt(r), -math.sqrt(r)}
    return len([x for x in roots if abs(abs(x) - math.sqrt(3)) > 1e-9])


ok(
    "名工大23-4 極値 1∓8√6/3・0・2、面積 15/4+log(3/8)、共有点は 3 個か 1 個",
    abs(_ff23(-math.sqrt(6)) - (1 - 8 * math.sqrt(6) / 3)) < 1e-9
    and abs(_ff23(math.sqrt(6)) - (1 + 8 * math.sqrt(6) / 3)) < 1e-9
    and abs(_ff23(-1)) < 1e-12
    and abs(_ff23(1) - 2) < 1e-12
    and abs(_S23b - (15 / 4 + math.log(3 / 8))) < 1e-7
    and [_cnt23(m) for m in (-3, 0, 1, 4 / 3, 1.5, 2, 2.5, 5)] == [3, 3, 3, 1, 1, 1, 3, 3],
    f"極値は {_ff23(-math.sqrt(6)):.7f},{_ff23(-1):.1f},{_ff23(1):.1f},{_ff23(math.sqrt(6)):.7f}、面積 {_S23b:.7f}（15/4+log(3/8)={15/4+math.log(3/8):.7f}）、m=-3,0,1,4/3,1.5,2,2.5,5 の共有点は {[_cnt23(m) for m in (-3,0,1,4/3,1.5,2,2.5,5)]}",
)

# ---- 名工大2022 ----
_X22 = lambda t: math.cos(t) ** 2
_sp22 = lambda t: math.hypot(-2 * math.sin(2 * t), -math.sin(3 * t))
_h22 = lambda X: (1 - X) * (4 * X + 1) ** 2
_mx22 = max(_sp22(math.pi * i / 200000) for i in range(200001))
_L22 = quad(lambda t: math.sin(t) * (4 * math.cos(t) ** 2 + 1), 0, math.pi, 100001)[0]
ok(
    "名工大22-1 sin²2t=4X(1-X)・sin²3t=(1-X)(4X-1)²、|v| の最大 5√15/9、道のり 14/3",
    all(
        abs(math.sin(2 * t) ** 2 - 4 * _X22(t) * (1 - _X22(t))) < 1e-12
        and abs(math.sin(3 * t) ** 2 - (1 - _X22(t)) * (4 * _X22(t) - 1) ** 2) < 1e-12
        for t in (0.3, 0.9, 2.0)
    )
    and abs(_mx22 - 5 * math.sqrt(15) / 9) < 1e-6
    and abs(math.sqrt(_h22(7 / 12)) - 5 * math.sqrt(15) / 9) < 1e-12
    and abs(_L22 - 14 / 3) < 1e-9,
    f"t=0.3,0.9,2.0 で (1) の式が一致。速さの最大は走査で {_mx22:.7f}（5√15/9={5*math.sqrt(15)/9:.7f}、X=7/12）、道のり {_L22:.7f}（14/3={14/3:.7f}）",
)

_g22 = lambda x: -x * (x + 2)
_f22 = lambda x: x**3 - 3 * x**2 - 6 * x + 8
_S22 = quad(lambda x: _f22(x) - _g22(x), -2, 2, 100001)[0]
_I22 = quad(lambda x: _g22(x) / _f22(x), 2, 3, 100001)[0]
ok(
    "名工大22-2 a=-2・g=-x(x+2)、f-g=(x+2)(x-b)²、b=2・f=x³-3x²-6x+8、∫=5log2/3",
    abs(_g22(-1) - 1) < 1e-12
    and abs(_g22(-2)) < 1e-12
    and abs(_g22(0)) < 1e-12
    and all(abs(_f22(x) - _g22(x) - (x + 2) * (x - 2) ** 2) < 1e-9 for x in (-3, 0, 1, 5))
    and abs(_S22 - 64 / 3) < 1e-6
    and _f22(0) - _g22(0) > 0
    and abs(_I22 - 5 / 3 * math.log(2)) < 1e-7,
    f"g(-1)={_g22(-1)}、f-g=(x+2)(x-2)² を確認、面積 {_S22:.7f}（64/3={64/3:.7f}）、∫ {_I22:.7f}（5log2/3={5/3*math.log(2):.7f}）",
)

_a22v = (3.0, 0.0, 0.0)
_c22x = -1.0
_c22y = math.sqrt(4 - 1)
_c22v = (_c22x, _c22y, 0.0)
_d22x = 4.5 / 3
_d22y = (0 - _c22v[0] * _d22x) / _c22v[1]
_d22z = math.sqrt(9 - _d22x**2 - _d22y**2)
_d22v = (_d22x, _d22y, _d22z)
_sb22 = lambda u, v: tuple(x - y for x, y in zip(u, v))
_dt22 = lambda u, v: sum(x * y for x, y in zip(u, v))
_cr22 = lambda u, v: (u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0])
_nr22 = lambda u: math.sqrt(_dt22(u, u))
_B22 = tuple(_a22v[i] + _c22v[i] for i in range(3))
_P22 = tuple(2 / 3 * _a22v[i] + 1 / 2 * _c22v[i] + 1 / 3 * _d22v[i] for i in range(3))
_Q22 = tuple(2 / 3 * _P22[i] for i in range(3))
_R22 = tuple(3 / 5 * _c22v[i] + 2 / 5 * _d22v[i] for i in range(3))
ok(
    "名工大22-3 a·c=-3・a·d=9/2、∠BAD=60°、OP=2a/3+c/2+d/3、OQ=2OP/3・OR=3c/5+2d/5",
    abs(_nr22(_d22v) - 3) < 1e-9
    and abs(_nr22(_sb22(_d22v, _a22v)) - 3) < 1e-9
    and abs(_dt22(_sb22(_B22, _a22v), _sb22(_d22v, _a22v)) / (_nr22(_sb22(_B22, _a22v)) * _nr22(_sb22(_d22v, _a22v))) - 0.5) < 1e-9
    and abs(_dt22(_P22, _sb22(_B22, _a22v))) < 1e-9
    and abs(_dt22(_P22, _sb22(_d22v, _a22v))) < 1e-9
    and _nr22(_cr22(_sb22(_Q22, _a22v), _sb22(_R22, _a22v))) < 1e-9
    and _nr22(_cr22(_sb22(_R22, _c22v), _sb22(_d22v, _c22v))) < 1e-9,
    f"|d|={_nr22(_d22v):.6f}・|d-a|={_nr22(_sb22(_d22v,_a22v)):.6f}（正三角形）、cos∠BAD={_dt22(_sb22(_B22,_a22v),_sb22(_d22v,_a22v))/(_nr22(_sb22(_B22,_a22v))*_nr22(_sb22(_d22v,_a22v))):.6f}、OP は AB・AD と直交、A・Q・R は一直線で R は CD 上",
)


def _bseq22(z, n):
    A = [None, z * (z - 1)]
    B = [None, z * (z - 1)]
    for k in range(1, n + 1):
        A.append((z - 1) * A[k])
        B.append(A[k + 1] - B[k])
    return A, B


_ok22d = True
for _z in (0.3 + 0.7j, 2.0 + 0j, -1.5 + 0.2j):
    _A, _B = _bseq22(_z, 6)
    for _n in range(1, 6):
        if abs(_A[_n] - _z * (_z - 1) ** _n) > 1e-9:
            _ok22d = False
        if abs(_B[_n] - (_z - 1) * ((_z - 1) ** _n - (-1) ** _n)) > 1e-9:
            _ok22d = False
_r22 = [0 + 0j, 1 + 0j, (3 + math.sqrt(3) * 1j) / 2, (3 - math.sqrt(3) * 1j) / 2]
_realonly22 = []
for _k in range(1, 8):
    _zs = [1 + 0j] + [1 - cmath.exp(2j * math.pi * j / _k) for j in range(_k)]
    if all(abs(z.imag) < 1e-12 for z in _zs):
        _realonly22.append(_k)
ok(
    "名工大22-4 aₙ=z(z-1)ⁿ、bₙ=(z-1){(z-1)ⁿ-(-1)ⁿ}、b₃=0 は4つ、実数のみは k=1,2",
    _ok22d
    and all(abs(_bseq22(z, 4)[1][3]) < 1e-12 for z in _r22)
    and _realonly22 == [1, 2],
    f"3つの z で n=1..5 まで式と一致。b₃=0 の4解 0,1,(3±√3i)/2 で |b₃|<10⁻¹²。bₖ=0 の解が実数だけになる k は {_realonly22}",
)


# ---- 名工大2021 ----


def _f21(x):
    return (x - 1) * math.sqrt(abs(x - 2))


def _df21(x, h=1e-6):
    return (_f21(x + h) - _f21(x - h)) / (2 * h)


_sg21 = [1 if _df21(x) > 0 else -1 for x in (1.0, 1.6, 1.8, 2.5)]
_ar21 = quad(lambda x: (x - 1) * math.sqrt(2 - x), 1.0, 2.0, 200001)[0]
_t21 = (-1 + math.sqrt(17)) / 2
ok(
    "名工大21-1 極大 2√3/9・極小 0、面積 4/15、接点 t=(-1+√17)/2",
    abs(_f21(5 / 3) - 2 * math.sqrt(3) / 9) < 1e-12
    and abs(_f21(2)) < 1e-12
    and _sg21 == [1, 1, -1, 1]
    and abs(_ar21 - 4 / 15) < 1e-6
    and abs(_f21(_t21) / _t21 - _df21(_t21)) < 1e-6
    and 1 < _t21 < 2,
    f"f(5/3)={_f21(5/3):.7f}（2√3/9={2*math.sqrt(3)/9:.7f}）、f(2)={_f21(2):.7f}、"
    f"f' の符号は x=1,1.6,1.8,2.5 で {_sg21}、面積 {_ar21:.7f}（4/15={4/15:.7f}）、"
    f"t={_t21:.7f} で f(t)/t={_f21(_t21)/_t21:.7f}・f'(t)={_df21(_t21):.7f}",
)


def _g21(t):
    return 8 * t**4 + (t - 1) ** 4


_tmin21 = min((i / 1000000 for i in range(-1000000, 1000001)), key=_g21)
_d21 = math.sqrt(_g21(_tmin21))
_X21 = 2 * math.sqrt(2)


def _s21(x):
    return math.sqrt(x / _X21)


_s2a21 = quad(lambda x: (1 - _s21(x)) ** 2, 0.0, _X21, 200001)[0]
_s2v21 = quad(
    lambda x: math.pi * max(abs((_s21(x) + 1) ** 2 - 1), abs(1 - (1 - _s21(x)) ** 2)) ** 2,
    0.0,
    _X21,
    200001,
)[0]
ok(
    "名工大21-2 d=2√6/9、面積 √2/3、体積 118√2π/15",
    abs(_d21 - 2 * math.sqrt(6) / 9) < 1e-9
    and abs(_tmin21 - 1 / 3) < 1e-5
    and abs(_s2a21 - math.sqrt(2) / 3) < 1e-6
    and abs(_s2v21 - 118 * math.sqrt(2) * math.pi / 15) < 1e-5,
    f"最小は t={_tmin21:.6f} で距離 {_d21:.7f}（2√6/9={2*math.sqrt(6)/9:.7f}）、"
    f"面積 {_s2a21:.7f}（√2/3={math.sqrt(2)/3:.7f}）、"
    f"体積 {_s2v21:.7f}（118√2π/15={118*math.sqrt(2)*math.pi/15:.7f}）",
)

_a21 = [None, Fraction(1)]
_b21 = [None, Fraction(0)]
for _n in range(1, 13):
    _a21.append((_n + 3) * _a21[_n])
    _b21.append((_n + 3) * _b21[_n] + Fraction(math.factorial(_n + 1)))
_S21 = []
_acc = Fraction(0)
for _n in range(1, 13):
    _acc += _b21[_n] / Fraction(3) ** _n
    _S21.append(_acc)
ok(
    "名工大21-3 P₄=120x+120、aₙ=(n+2)!/6、差は 6/((n+2)(n+3))、bₙ=(n-1)(n+1)!/3、Sₙ=(n+2)!/3^(n+1)-2/3",
    _a21[4] == 120
    and _b21[4] == 120
    and all(_a21[n] == Fraction(math.factorial(n + 2), 6) for n in range(1, 13))
    and all(_b21[n] == Fraction((n - 1) * math.factorial(n + 1), 3) for n in range(1, 13))
    and all(
        _b21[n + 1] / _a21[n + 1] - _b21[n] / _a21[n] == Fraction(6, (n + 2) * (n + 3))
        for n in range(1, 12)
    )
    and all(_b21[n] / _a21[n] == Fraction(2 * (n - 1), n + 2) for n in range(1, 13))
    and all(
        _S21[n - 1] == Fraction(math.factorial(n + 2), 3 ** (n + 1)) - Fraction(2, 3)
        for n in range(1, 13)
    ),
    f"P₄={_a21[4]}x+{_b21[4]}、a₁..a₅={[int(_a21[n]) for n in range(1,6)]}、"
    f"b₁..b₅={[int(_b21[n]) for n in range(1,6)]}、S₁..S₃={[str(x) for x in _S21[:3]]}",
)

_B21 = (-math.sqrt(6), math.sqrt(2))
_A21 = (2 * math.sqrt(2), 0.0)
_m21 = ((_A21[0] + _B21[0]) / 2, (_A21[1] + _B21[1]) / 2)
_ang21 = math.degrees(math.atan2(_B21[1], _B21[0]))
_err21 = 0.0
for _i in range(0, 31416):
    _th = _i * math.pi / 31415
    _r = 7 / (3 + math.sqrt(2) * math.cos(_th + math.pi / 6))
    _P = (_r * math.cos(_th), _r * math.sin(_th))
    _pb = math.hypot(_P[0] - _B21[0], _P[1] - _B21[1])
    _err21 = max(_err21, abs(_pb - abs(6 - _r)))
_th21 = min(
    (i * math.pi / 1000000 for i in range(0, 1000001)),
    key=lambda t: abs(7 / (3 + math.sqrt(2) * math.cos(t + math.pi / 6)) - 3.5),
)
ok(
    "名工大21-4 ∠AOB=150°・B(-√6,√2)、BP²=r²+4√2rcos(θ+π/6)+8、r=7/(3+√2cos(θ+π/6))、θ=7π/12",
    abs(math.hypot(*_B21) - 2 * math.sqrt(2)) < 1e-12
    and abs(_m21[1] - (2 + math.sqrt(3)) * _m21[0]) < 1e-12
    and abs((_B21[1] - _A21[1]) * (2 + math.sqrt(3)) + (_B21[0] - _A21[0])) < 1e-12
    and abs(_ang21 - 150) < 1e-9
    and _err21 < 1e-12
    and abs(_th21 - 7 * math.pi / 12) < 1e-5,
    f"B=({_B21[0]:.7f}, {_B21[1]:.7f}) は OB={math.hypot(*_B21):.7f}=2√2 で中点が直線上・AB は直線と垂直、"
    f"動径の角は {_ang21:.1f}°、BP と PQ の差は最大 {_err21:.1e}、"
    f"r=7/2 は θ={_th21:.7f}（7π/12={7*math.pi/12:.7f}）",
)


# ---- 名工大2020 ----


def _g20(x):
    return x * x / (x**3 + 1)


def _f20(x, k):
    return math.exp(k * x) / math.sqrt(x**3 + 1)


_dok20 = True
for _k in (-1.0, 0.3, 2.0):
    for _x in (-0.5, 0.2, 1.3, 3.0):
        _num = (_f20(_x + 1e-6, _k) - _f20(_x - 1e-6, _k)) / 2e-6
        _fml = math.exp(_k * _x) * (2 * _k * (_x**3 + 1) - 3 * _x * _x) / (2 * (_x**3 + 1) ** 1.5)
        if abs(_num - _fml) > 1e-5 * max(1.0, abs(_fml)):
            _dok20 = False
    _num = (_g20(_x + 1e-6) - _g20(_x - 1e-6)) / 2e-6
    if abs(_num - _x * (2 - _x**3) / (_x**3 + 1) ** 2) > 1e-5:
        _dok20 = False
_kc20 = 4 ** (1 / 3) / 2


def _cnt20(k, with_tangent):
    """h(x)=2k(x³+1)-3x² の (-1,∞) での実数解（符号が変わるものだけ数えるか、重解も含めるか）。"""
    n = 400000
    pts = [-1 + 1e-9 + 61 * i / n for i in range(n + 1)]
    hs = [2 * k * (p**3 + 1) - 3 * p * p for p in pts]
    c = sum(1 for i in range(n) if hs[i] * hs[i + 1] < 0)
    if with_tangent:
        # 判別式 216k(1-2k³) が 0 になるのは k=0（重解 x=0）と k=∛4/2（重解 x=∛2）だけ
        if abs(k) < 1e-12 or abs(k - _kc20) < 1e-12:
            c += 1
    return c


_sol20 = [_cnt20(k, True) for k in (-1.0, 0.0, 0.1, 0.5, 0.7, _kc20, 0.9, 2.0)]
_ext20 = [_cnt20(k, False) for k in (-1.0, 0.0, 0.1, 0.5, _kc20, 0.9, 2.0)]
ok(
    "名工大20-1 f' の式、g の極値 0 と ∛4/3、f'=0 の解は 0・1・3・2・1 個、極値は 0・0・3・1・1 個",
    _dok20
    and abs(_g20(0)) < 1e-15
    and abs(_g20(2 ** (1 / 3)) - 4 ** (1 / 3) / 3) < 1e-12
    and _sol20 == [0, 1, 3, 3, 3, 2, 1, 1]
    and _ext20 == [0, 0, 3, 3, 1, 1, 1],
    f"f'・g' は数値微分と一致、g の極大 {_g20(2**(1/3)):.7f}（∛4/3={4**(1/3)/3:.7f}）・極小 {_g20(0):.7f}、"
    f"k=-1,0,0.1,0.5,0.7,∛4/2,0.9,2 の解の個数 {_sol20}、極値の個数 {_ext20}（境界 ∛4/2={_kc20:.7f}）",
)

_x20, _y20 = 2, 1
_p20 = True
for _n in range(1, 15):
    if _x20 * _x20 - 5 * _y20 * _y20 != (-1) ** _n:
        _p20 = False
    if not (_x20 >= 2 * _y20 and _y20 >= 4 ** (_n - 1)):
        _p20 = False
    _x20, _y20 = 2 * _x20 + 5 * _y20, _x20 + 2 * _y20
_x40, _y40 = 2, 1
for _ in range(39):
    _x40, _y40 = 2 * _x40 + 5 * _y40, _x40 + 2 * _y40
_r40 = _x40 / _y40
ok(
    "名工大20-2 xₙ²-5yₙ²=(-1)ⁿ、(Pₙ) の帰納法、xₙ/yₙ→√5",
    _p20 and abs(_r40 - math.sqrt(5)) < 1e-15,
    f"n=1..14 で 2乗の差と (Pₙ) がどちらも成立、x₄₀/y₄₀={_r40:.14f}（√5={math.sqrt(5):.14f}）",
)


def _Bpt20(t):
    return ((t + math.sqrt(1 - t * t)) / math.sqrt(2), (t - math.sqrt(1 - t * t)) / math.sqrt(2))


def _Snum20(t):
    def inner(ph):
        return 0.5 * max(0.0, (t / math.cos(ph - math.pi / 4)) ** 2 - 1.0)

    return quad(inner, 0.0, math.pi / 4, 4001)[0]


def _Sfml20(t):
    th = math.pi / 4 - math.acos(t)
    return 0.5 * (math.sin(th) ** 2 + math.sin(th) * math.cos(th) - th)


_t20ok = True
for _t in (0.75, 0.85, 0.95, 1.0):
    _bx, _by = _Bpt20(_t)
    _th = math.atan2(_by, _bx)
    if abs(math.hypot(_bx, _by) - 1) > 1e-12 or abs(math.cos(_th - math.pi / 4) - _t) > 1e-12:
        _t20ok = False
    if abs(_Snum20(_t) - _Sfml20(_t)) > 1e-7:
        _t20ok = False
_I20 = quad(_Snum20, 1 / math.sqrt(2), 1.0, 201)[0]


def _A20(z):
    a = math.sqrt(2) * (1 - z)
    if a <= 1e-12:
        return 0.0

    def inte(xx):
        v = a - xx
        if xx < 1:
            v -= math.sqrt(max(0.0, 1 - xx * xx))
        return max(0.0, v)

    return 4 * quad(inte, 0.0, a, 2001)[0]


_V20 = quad(_A20, 0.0, 1.0, 201)[0]
ok(
    "名工大20-3 t=cos(θ-π/4)、S=(sin²θ+sinθcosθ-θ)/2、∫S dt=(1+√2)/6-π/8、K の体積=4(1+√2)/3-π",
    _t20ok
    and abs(_I20 - ((1 + math.sqrt(2)) / 6 - math.pi / 8)) < 1e-7
    and abs(_V20 - (4 * (1 + math.sqrt(2)) / 3 - math.pi)) < 1e-4,
    f"t=0.75,0.85,0.95,1 で |OB|=1 かつ cos(θ-π/4)=t、S も数値と式が一致。"
    f"∫S dt={_I20:.7f}（式 {(1+math.sqrt(2))/6-math.pi/8:.7f}）、"
    f"K の体積={_V20:.6f}（式 {4*(1+math.sqrt(2))/3-math.pi:.6f}）",
)

_A4 = (8.0, 0.0)
_B4 = (10 / 8, math.sqrt(100 - (10 / 8) ** 2))
_G4 = (32 / 8, (50 - 4 * (10 / 8)) / _B4[1])
_S4 = abs(_A4[0] * _B4[1] - _A4[1] * _B4[0]) / 2
_t4 = _G4[1] / _B4[1]
_s4 = (_G4[0] - _B4[0] * _t4) / 8


def _E20(x):
    """直線 DG と直線 OB の交点の、OB に対する比。"""
    D = (x * 8.0, 0.0)
    a11, a12, b1 = _G4[0] - D[0], -_B4[0], -D[0]
    a21, a22, b2 = _G4[1] - D[1], -_B4[1], -D[1]
    det = a11 * a22 - a12 * a21
    return (a11 * b2 - b1 * a21) / det


_lo20 = min(i / 100000 for i in range(1, 100001) if 0 < _E20(i / 100000) <= 1 + 1e-15)
_best20 = min(
    ((x * _E20(x) * _S4, x) for x in (i / 100000 for i in range(78948, 100001)) if 0 < _E20(x) <= 1)
)
ok(
    "名工大20-4 a·b=10、S=15√7、OG=3a/7+16b/35、15/19≦x≦1、最小 576√7/49（x=6/7）",
    abs(_A4[0] * _B4[0] + _A4[1] * _B4[1] - 10) < 1e-12
    and abs(math.hypot(_A4[0] - _B4[0], _A4[1] - _B4[1]) - 12) < 1e-12
    and abs(_S4 - 15 * math.sqrt(7)) < 1e-9
    and abs(math.hypot(*_G4) - math.hypot(_G4[0] - _A4[0], _G4[1] - _A4[1])) < 1e-9
    and abs(math.hypot(*_G4) - math.hypot(_G4[0] - _B4[0], _G4[1] - _B4[1])) < 1e-9
    and abs(_s4 - 3 / 7) < 1e-12
    and abs(_t4 - 16 / 35) < 1e-12
    and abs(_lo20 - 15 / 19) < 2e-5
    and abs(_best20[1] - 6 / 7) < 2e-5
    and abs(_best20[0] - 576 * math.sqrt(7) / 49) < 1e-6,
    f"内積 {_A4[0]*_B4[0]+_A4[1]*_B4[1]:.1f}・AB={math.hypot(_A4[0]-_B4[0],_A4[1]-_B4[1]):.1f}、"
    f"面積 {_S4:.7f}（15√7={15*math.sqrt(7):.7f}）、外心までの距離はどれも {math.hypot(*_G4):.7f} で係数は "
    f"{_s4:.7f}・{_t4:.7f}、辺 OB と交わる最小の x={_lo20:.5f}（15/19={15/19:.7f}）、"
    f"面積の最小 {_best20[0]:.7f} は x={_best20[1]:.5f}（576√7/49={576*math.sqrt(7)/49:.7f}）",
)


# ---- 名工大2019 ----

_ok19a = True
for _k in (0.6, 1.0, 2.5):
    _a = 2 * _k - 1
    # 接点 (2k-1, 1/2) における接線に x=-1 を入れると 1 になるか
    _tl = _k / (1 + _a) - _k / (1 + _a) ** 2 * (-1 - _a)
    if abs(_tl - 1) > 1e-12 or abs(_k / (1 + _a) - 0.5) > 1e-12:
        _ok19a = False
    _S = quad(lambda x: (-x / 2 + _k) - _k / (1 + x), 0.0, _a, 20001)[0]
    _V = math.pi * quad(
        lambda x: ((-x / 2 + _k) - 0.5) ** 2 - (_k / (1 + x) - 0.5) ** 2, 0.0, _a, 20001
    )[0]
    if abs(_S - (_k * _k - 0.25 - _k * math.log(2 * _k))) > 1e-8:
        _ok19a = False
    if abs(_V - math.pi * ((2 * _k - 1) ** 3 / 12 - _k * _k + 0.25 + _k * math.log(2 * _k))) > 1e-8:
        _ok19a = False
_S1 = quad(lambda x: (-x / 2 + 1) - 1 / (1 + x), 0.0, 1.0, 20001)[0]
_V1 = math.pi * quad(lambda x: ((-x / 2 + 1) - 0.5) ** 2 - (1 / (1 + x) - 0.5) ** 2, 0.0, 1.0, 20001)[0]
ok(
    "名工大19-1 P(2k-1, 1/2)、ℓ: y=-x/2+k、S=k²-1/4-k log2k、V=π{(2k-1)³/12-k²+1/4+k log2k}",
    _ok19a,
    f"k=0.6,1,2.5 で接線は (-1,1) を通り接点の y は 1/2。k=1 で面積 {_S1:.9f}"
    f"（式 {1 - 0.25 - math.log(2):.9f}）・体積 {_V1:.9f}（式 {math.pi*(1/12-1+0.25+math.log(2)):.9f}）",
)

_h19 = min(math.exp(i / 1000) - (i / 1000) ** 2 / 2 for i in range(0, 20001))
_F19 = lambda x: -2 * (math.sqrt(x) + 1) * math.exp(-math.sqrt(x))
_d19 = max(
    abs((_F19(x + 1e-6) - _F19(x - 1e-6)) / 2e-6 - math.exp(-math.sqrt(x))) for x in (0.5, 2.0, 9.0)
)
_I19 = quad(lambda x: math.exp(-math.sqrt(x)), 0.0, 400.0, 200001)[0]
ok(
    "名工大19-2 eˣ>x²/2、xe^(-x)→0、∫e^(-√x)dx=-2(√x+1)e^(-√x)、極限は 2",
    abs(_h19 - 1) < 1e-12 and _d19 < 1e-6 and abs(_I19 - 2) < 1e-4,
    f"eˣ-x²/2 の最小は {_h19:.6f}（x=0）、原始関数の数値微分の差は最大 {_d19:.1e}、"
    f"∫₀⁴⁰⁰={_I19:.7f}（極限 2）",
)


def _P19(t):
    return complex(math.cos(t), math.sin(t))


def _Q19(t):
    return complex(2 * math.cos(2 * t), 2 * math.sin(2 * t))


_A19 = complex(2, 0)
_ok19c = True
for _t in (0.0, 0.4, math.pi / 3, 1.5, 3.0):
    _p, _q = _P19(_t), _Q19(_t)
    if abs(abs(_q - _p) - abs(_A19 - _p)) > 1e-9:
        _ok19c = False
    _u1 = (_A19 - _p) / abs(_A19 - _p)
    _u2 = (_q - _p) / abs(_q - _p) if abs(_q - _p) > 1e-12 else _u1
    _bis = _u1 + _u2
    if abs(_bis.real * _p.imag - _bis.imag * _p.real) > 1e-12:
        _ok19c = False
_in19 = []
for _t in (1.0272, 1.0672):
    _p = _P19(_t)
    _in19.append(any(abs(_A19 + (_p - _A19) * i / 20000) < 1 - 1e-9 for i in range(20000)))
_sec19 = 0.0
_N19 = 100000
for _i in range(_N19):
    _q1, _q2 = _Q19(math.pi / 3 * _i / _N19), _Q19(math.pi / 3 * (_i + 1) / _N19)
    _sec19 += 0.5 * (_q1.real * _q2.imag - _q1.imag * _q2.real)
_tri19 = 0.5 * abs(_Q19(0).real * _Q19(math.pi / 3).imag - _Q19(0).imag * _Q19(math.pi / 3).real)
_seg19 = _sec19 - _tri19
_R19 = lambda t: (4 * _P19(t) + _Q19(t)) / 5
_L19 = sum(
    abs(_R19(math.pi / 3 * (i + 1) / 200000) - _R19(math.pi / 3 * i / 200000)) for i in range(200000)
)
ok(
    "名工大19-3 a=0・b=π/3、Q=(2cos2θ, 2sin2θ)、弓形 4π/3-√3、長さ 8/5",
    _ok19c
    and _in19 == [False, True]
    and abs(_seg19 - (4 * math.pi / 3 - math.sqrt(3))) < 1e-7
    and abs(_L19 - 1.6) < 1e-7,
    f"PQ=PA かつ OP が二等分、線分 AP が円の内部に入るかは θ=1.0272,1.0672 で {_in19}（π/3={math.pi/3:.4f}）、"
    f"弓形 {_seg19:.9f}（4π/3-√3={4*math.pi/3-math.sqrt(3):.9f}）、長さ {_L19:.9f}（8/5=1.6）",
)

_coll19 = lambda z: abs(((z**5 - z) / (z**3 - z)).imag) < 1e-9
_eq19 = []
for _z in (cmath.exp(1j * math.pi / 3), -cmath.exp(1j * math.pi / 3)):
    _a, _b, _c = _z, _z**3, _z**5
    _eq19.append(
        abs(abs(_b - _a) - math.sqrt(3)) < 1e-12
        and abs(abs(_c - _b) - math.sqrt(3)) < 1e-12
        and abs(abs(_a - _c) - math.sqrt(3)) < 1e-12
        and (_b - _a).real * (_c - _b).imag - (_b - _a).imag * (_c - _b).real > 0
        and abs(_z * _z - complex(-0.5, math.sqrt(3) / 2)) < 1e-12
    )
random.seed(19)
_mx19 = 0.0
_bad19 = 0
for _ in range(200000):
    _k = random.uniform(-50, 50)
    if abs(_k) < 1e-6:
        continue
    _z2 = 1 / complex(-1, _k)
    for _z in (cmath.sqrt(_z2), -cmath.sqrt(_z2)):
        _r = (_z**5 - _z) / (_z**5 - _z**3)
        if abs(_r.real) > 1e-9:
            _bad19 += 1
        _mx19 = max(_mx19, abs(_z))
ok(
    "名工大19-4 異なる3点は z≠0 かつ z⁴≠1、一直線は z² が実数、正三角形は z²=(-1±√3i)/2、垂直なら |z|<1",
    _coll19(complex(0.7, 0))
    and _coll19(complex(0, 0.7))
    and not _coll19(complex(0.5, 0.5))
    and _eq19 == [True, True]
    and _bad19 == 0
    and _mx19 < 1,
    f"z=0.7・0.7i は一直線上、0.5+0.5i はそうでない。z=±e^(πi/3) は3辺が √3 で反時計回り。"
    f"垂直条件を満たす z を 20 万通り作ると |z| の最大は {_mx19:.8f}（1 未満）",
)


# ---- 電通大2024 ----


def _f24(x):
    return 1 / math.cos(x) ** 2 - 16 * math.sin(x) ** 2


_dd24 = lambda x: (_f24(x + 1e-6) - _f24(x - 1e-6)) / 2e-6
_sg24 = [1 if _dd24(x) > 0 else -1 for x in (-1.3, -0.5, 0.5, 1.3)]
_S24 = quad(
    lambda x: 16 * math.sin(x) ** 2 - 1 / math.cos(x) ** 2, math.pi / 12, 5 * math.pi / 12, 20001
)[0]
ok(
    "電通大24-1 α=π/12・β=5π/12、tan は 2∓√3、f'=0 は 0・±π/3、極値 1 と -8、S=8π/3-2√3",
    abs(_f24(math.pi / 12)) < 1e-12
    and abs(_f24(5 * math.pi / 12)) < 1e-12
    and abs(math.tan(math.pi / 12) - (2 - math.sqrt(3))) < 1e-12
    and abs(math.tan(5 * math.pi / 12) - (2 + math.sqrt(3))) < 1e-12
    and all(abs(_dd24(x)) < 1e-6 for x in (0.0, math.pi / 3, -math.pi / 3))
    and abs(_f24(0) - 1) < 1e-12
    and abs(_f24(math.pi / 3) + 8) < 1e-9
    and _sg24 == [-1, 1, -1, 1]
    and abs(_S24 - (8 * math.pi / 3 - 2 * math.sqrt(3))) < 1e-8,
    f"f(π/12)・f(5π/12) は 0、tan は {math.tan(math.pi/12):.7f}・{math.tan(5*math.pi/12):.7f}、"
    f"f(0)={_f24(0):.6f}・f(±π/3)={_f24(math.pi/3):.6f}、f' の符号は {_sg24}、"
    f"面積 {_S24:.9f}（8π/3-2√3={8*math.pi/3-2*math.sqrt(3):.9f}）",
)


def _g1_24(x):
    return math.exp(x) * math.sqrt(max(0.0, 6 - math.exp(x)))


def _g2_24(x):
    return 2 * math.sqrt(2) * math.exp(x / 2)


_Fp24 = lambda x: -(2 / 3) * (6 - math.exp(x)) ** 1.5
_S2_24 = quad(lambda x: _g1_24(x) - _g2_24(x), math.log(2), math.log(4), 20001)[0]
_V2_24 = math.pi * quad(lambda x: _g1_24(x) ** 2 - _g2_24(x) ** 2, math.log(2), math.log(4), 20001)[0]
ok(
    "電通大24-2 x₀=log6、共有点 (log2,4)・(log4,4√2)、極大 4√2、I=-2(6-eˣ)^(3/2)/3、S=(40-28√2)/3、V=4π/3",
    abs(_g1_24(math.log(2)) - 4) < 1e-12
    and abs(_g2_24(math.log(2)) - 4) < 1e-12
    and abs(_g1_24(math.log(4)) - 4 * math.sqrt(2)) < 1e-12
    and abs(_g2_24(math.log(4)) - 4 * math.sqrt(2)) < 1e-12
    and max(
        abs((_Fp24(x + 1e-6) - _Fp24(x - 1e-6)) / 2e-6 - _g1_24(x)) for x in (0.5, 1.0, 1.5)
    )
    < 1e-6
    and abs(_S2_24 - (40 - 28 * math.sqrt(2)) / 3) < 1e-8
    and abs(_V2_24 - 4 * math.pi / 3) < 1e-7,
    f"x₀=log6={math.log(6):.7f}、x=log2 で f=g={_g1_24(math.log(2)):.7f}・x=log4 で f=g={_g1_24(math.log(4)):.7f}、"
    f"面積 {_S2_24:.9f}（(40-28√2)/3={(40-28*math.sqrt(2))/3:.9f}）、体積 {_V2_24:.9f}（4π/3={4*math.pi/3:.9f}）",
)

_mx24 = None
_my24 = None
_N24 = 4000
for _i in range(_N24 + 1):
    _th = 2 * math.pi * _i / _N24
    _x, _y = math.cos(_th), 2 * math.sin(_th)
    _v = _x + math.sqrt(2) * _y
    if _mx24 is None or _v > _mx24[0]:
        _mx24 = (_v, _x, _y)
    _w = _y / (_x - 3)
    if _my24 is None or _w > _my24[0]:
        _my24 = (_w, _x, _y)


def _other24(a):
    """円 Cₐ と楕円 E の、A(-1,0) 以外の共有点があるか。2次方程式の解の公式で直接調べる。"""
    A, B, C = -3.0, -2 * a, 3 - 2 * a
    disc = B * B - 4 * A * C
    if disc < 0:
        return False
    for u in ((-B + math.sqrt(disc)) / (2 * A), (-B - math.sqrt(disc)) / (2 * A)):
        if not (-1 + 1e-9 < u < 1 + 1e-12):
            continue
        u = min(1.0, u)
        y = math.sqrt(max(0.0, 4 * (1 - u * u)))
        for yy in {y, -y}:
            if math.hypot(u + 1, yy) > 1e-6:
                if (
                    abs((u - a) ** 2 + yy * yy - (a + 1) ** 2) < 1e-9
                    and abs(u * u + yy * yy / 4 - 1) < 1e-9
                ):
                    return True
    return False


_as24 = (-2.0, -0.5, -0.01, 0.0, 0.5, 1.0, 2.0, 2.99, 3.0, 3.01, 3.5)
_has24 = [_other24(a) for a in _as24]
ok(
    "電通大24-3 max(x+√2y)=3 で (1/3, 4√2/3)、max(y/(x-3))=√2/2 で (1/3, -4√2/3)、x₀=(3-2a)/3、0≦a<3",
    abs(_mx24[0] - 3) < 1e-5
    and abs(_mx24[1] - 1 / 3) < 1e-3
    and abs(_my24[0] - math.sqrt(2) / 2) < 1e-6
    and abs(_my24[2] + 4 * math.sqrt(2) / 3) < 1e-3
    and _has24 == [False, False, False, True, True, True, True, True, False, False, False],
    f"max(x+√2y)={_mx24[0]:.7f} は ({_mx24[1]:.4f}, {_mx24[2]:.4f})、"
    f"max(y/(x-3))={_my24[0]:.7f} は ({_my24[1]:.4f}, {_my24[2]:.4f})、"
    f"a={_as24} の A 以外の共有点は {_has24}",
)

_a24 = [None, Fraction(1)]
for _n in range(1, 12):
    _a24.append(Fraction(_n + 2, 2 * _n) * _a24[_n])
_b24 = [None, Fraction(1)]
for _n in range(1, 12):
    _b24.append(Fraction(_n + 2, 2 * _n) * _b24[_n] + Fraction((_n + 1) * (_n * _n - 4), 2**_n))
_P24 = lambda n: -(n + 1) * (n - 2) * (n * n - 7 * n + 1)
_best24 = max((float(_b24[n]), n) for n in range(1, 12))
ok(
    "電通大24-4 aₙ=n(n+1)/2ⁿ、b₂=b₃=-3/2・b₄=5/4、dₙ=(n²-5n+5)/2、bₙ、P(n)、最大は n=7",
    all(_a24[n] == Fraction(n * (n + 1), 2**n) for n in range(1, 12))
    and _b24[2] == Fraction(-3, 2)
    and _b24[3] == Fraction(-3, 2)
    and _b24[4] == Fraction(5, 4)
    and all(
        Fraction(2 ** (n - 1)) * _b24[n] / Fraction(n * (n + 1)) == Fraction(n * n - 5 * n + 5, 2)
        for n in range(1, 12)
    )
    and all(
        _b24[n] == Fraction(n * (n + 1) * (n * n - 5 * n + 5), 2**n) for n in range(1, 12)
    )
    and all(_b24[n + 1] - _b24[n] == Fraction(_P24(n), 2 ** (n + 1)) for n in range(1, 11))
    and _best24[1] == 7,
    f"aₙ・dₙ・bₙ・P(n) は n=1..11 で式と一致、b₂..b₄={[str(_b24[n]) for n in (2,3,4)]}、"
    f"bₙ={[round(float(_b24[n]), 4) for n in range(1, 12)]}、最大は n={_best24[1]}（{_best24[0]}）",
)


# ---- 電通大2023 ----


def _f23u(x):
    return math.sin(x) * math.sin(2 * x) - abs(math.cos(x)) * math.cos(x) ** 2


_id23 = max(
    abs(
        _f23u(math.pi * i / 1000)
        - (
            2 * math.cos(math.pi * i / 1000)
            - 2 * math.cos(math.pi * i / 1000) ** 3
            - abs(math.cos(math.pi * i / 1000)) * math.cos(math.pi * i / 1000) ** 2
        )
    )
    for i in range(1001)
)
_N23 = 0
_prev = _f23u(0.0)
_mx23 = (-1e18, 0.0)
_mn23 = (1e18, 0.0)
for _i in range(1, 400001):
    _x = math.pi * _i / 400000
    _cur = _f23u(_x)
    if _prev == 0 or _prev * _cur < 0:
        _N23 += 1
    if _cur > _mx23[0]:
        _mx23 = (_cur, _x)
    if _cur < _mn23[0]:
        _mn23 = (_cur, _x)
    _prev = _cur
_J23 = quad(lambda x: abs(_f23u(x)), 0.0, math.pi, 200001)[0]
ok(
    "電通大23-1 sinx sin2x=2cosx-2cos³x、N=2、M=4√2/9・m=-4√6/9、I=sinx-sin³x/3、J=(12+4√3)/9",
    _id23 < 1e-14
    and _N23 == 2
    and abs(_mx23[0] - 4 * math.sqrt(2) / 9) < 1e-8
    and abs(_mn23[0] + 4 * math.sqrt(6) / 9) < 1e-8
    and abs(_J23 - (12 + 4 * math.sqrt(3)) / 9) < 1e-7,
    f"(i) の差は最大 {_id23:.1e}、零点は {_N23} 個、最大 {_mx23[0]:.7f}（4√2/9={4*math.sqrt(2)/9:.7f}）・"
    f"最小 {_mn23[0]:.7f}（-4√6/9={-4*math.sqrt(6)/9:.7f}）、J={_J23:.9f}（(12+4√3)/9={(12+4*math.sqrt(3))/9:.9f}）",
)


def _g23u(x):
    return math.log(x) / (x + math.e) ** 2


def _gg23(x):
    return x + math.e - 2 * x * math.log(x)


_d23 = max(
    abs((_g23u(x + 1e-7) - _g23u(x - 1e-7)) / 2e-7 - _gg23(x) / (x * (x + math.e) ** 3))
    for x in (0.5, 1.5, 3.0)
)
_I23 = quad(lambda x: 1 / (x * (x + math.e)), 1.0, math.e, 20001)[0]
_S23 = quad(_g23u, 1.0, math.e, 20001)[0]
ok(
    "電通大23-2 g=x+e-2x logx、極大 e+2e^(-1/2)、f の極大 1/(4e²)、I=log((1+e)/2)/e、S=I-1/(2e)",
    _d23 < 1e-8
    and abs(_gg23(math.exp(-0.5)) - (math.e + 2 / math.sqrt(math.e))) < 1e-12
    and abs(_gg23(math.e)) < 1e-12
    and abs(_g23u(math.e) - 1 / (4 * math.e**2)) < 1e-15
    and abs(_I23 - math.log((1 + math.e) / 2) / math.e) < 1e-8
    and abs(_S23 - (math.log((1 + math.e) / 2) / math.e - 1 / (2 * math.e))) < 1e-8,
    f"f' と式の差は最大 {_d23:.1e}、g の極大 {_gg23(math.exp(-0.5)):.9f}（e+2e^(-1/2)={math.e+2/math.sqrt(math.e):.9f}）、"
    f"g(e)={_gg23(math.e):.1e}、f(e)={_g23u(math.e):.10f}（1/(4e²)={1/(4*math.e**2):.10f}）、"
    f"I={_I23:.9f}、S={_S23:.9f}",
)


def _fx23(t):
    return t * math.sqrt(t)


def _gy23(t):
    return math.sqrt(t * (2 * t - 1))


_df23 = max(_gy23(0.5 + i / 200000) - _fx23(0.5 + i / 200000) for i in range(0, 2000001))
_pts23 = [(0.0, 0.0)] + [
    (_fx23(0.5 + 0.5 * (i / 200000) ** 2), _gy23(0.5 + 0.5 * (i / 200000) ** 2))
    for i in range(200001)
]
_A23 = 0.0
for _i in range(len(_pts23)):
    _x1, _y1 = _pts23[_i]
    _x2, _y2 = _pts23[(_i + 1) % len(_pts23)]
    _A23 += _x1 * _y2 - _x2 * _y1
_A23 = abs(_A23) / 2
_sl23 = ((4 * 5 - 1) / (2 * math.sqrt(2 * 25 - 5))) / (1.5 * math.sqrt(5))
ok(
    "電通大23-3 x軸と (√2/4,0)、y=x と (1,1)、C は y≦x、t=5 の接線 y=19x/45+8√5/9、S=1/10",
    abs(_fx23(0.5) - math.sqrt(2) / 4) < 1e-15
    and abs(_gy23(0.5)) < 1e-15
    and abs(_fx23(1) - 1) < 1e-15
    and abs(_gy23(1) - 1) < 1e-15
    and _df23 <= 1e-12
    and abs(_sl23 - 19 / 45) < 1e-12
    and abs(_gy23(5) - _sl23 * _fx23(5) - 8 * math.sqrt(5) / 9) < 1e-12
    and abs(_A23 - 0.1) < 1e-8,
    f"t=1/2 で ({_fx23(0.5):.7f}, {_gy23(0.5):.1f})、t=1 で (1, 1)、g-f の最大 {_df23:.1e}、"
    f"t=5 の傾き {_sl23:.7f}（19/45={19/45:.7f}）・切片 {_gy23(5)-_sl23*_fx23(5):.7f}（8√5/9={8*math.sqrt(5)/9:.7f}）、"
    f"面積 {_A23:.9f}（1/10）",
)

_a23 = lambda n: (2 * n + 1) * math.sqrt(3)
_T23 = [sum(_a23(k) * _a23(k + 1) for k in range(1, n + 1)) for n in (1, 2, 3, 5)]
_U23 = [sum(1 / (_a23(k) * _a23(k + 1)) for k in range(1, n + 1)) for n in (1, 2, 5, 10)]
_n23 = 2000000
_ratio23 = (_n23 * (4 * _n23**2 + 18 * _n23 + 23)) / (_n23 * math.sqrt(3) * _n23 * (_n23 + 2))
ok(
    "電通大23-4 aₙ=(2n+1)√3、Tₙ=n(4n²+18n+23)、Tₙ/(nSₙ)→4√3/3、Uₙ=n/(9(2n+3))→1/18",
    abs(_a23(1) * _a23(2) - 45) < 1e-9
    and abs(_a23(2) * _a23(3) - 105) < 1e-9
    and all(abs(_T23[i] - n * (4 * n * n + 18 * n + 23)) < 1e-6 for i, n in enumerate((1, 2, 3, 5)))
    and all(
        abs(_U23[i] - n / (9 * (2 * n + 3))) < 1e-12 for i, n in enumerate((1, 2, 5, 10))
    )
    and abs(_ratio23 - 4 * math.sqrt(3) / 3) < 1e-5,
    f"a₁a₂={_a23(1)*_a23(2):.6f}・a₂a₃={_a23(2)*_a23(3):.6f}、Tₙ（n=1,2,3,5）={[round(v) for v in _T23]}、"
    f"Tₙ/(nSₙ) は n=2×10⁶ で {_ratio23:.7f}（4√3/3={4*math.sqrt(3)/3:.7f}）、"
    f"Uₙ（n=1,2,5,10）={[round(v, 9) for v in _U23]}",
)


# ---- 電通大2022 ----


def _f22(x, a):
    return (
        math.cos(3 * x)
        - (2 * a + 1) * math.cos(2 * x)
        + (2 * a + 3) * math.cos(x)
        - (2 * a + 1)
    )


_ok22a = True
for _a in (-0.8, 0.0, 0.3, 0.5, 0.9):
    if abs(_f22(4 * math.pi / 3, _a) + (2 * _a + 1)) > 1e-9:
        _ok22a = False
    for _i in range(1001):
        _x = math.pi + math.pi * _i / 1000
        _t = math.cos(_x)
        if abs(_f22(_x, _a) - 2 * _t * (2 * _t - 1) * (_t - _a)) > 1e-12:
            _ok22a = False
_cnt22 = [len({0.0, 0.5, a}) for a in (-0.8, 0.0, 0.25, 0.5, 0.9)]
_d22u = lambda x: (_f22(x + 1e-6, 0.5) - _f22(x - 1e-6, 0.5)) / 2e-6
_loc22 = []
_prev = _d22u(math.pi + 1e-4)
for _i in range(1, 400001):
    _x = math.pi + 1e-4 + (math.pi - 2e-4) * _i / 400000
    _cur = _d22u(_x)
    if _prev > 0 and _cur < 0:
        _loc22.append(math.cos(_x))
    _prev = _cur
_S22 = quad(lambda x: _f22(x, 0.5), 3 * math.pi / 2, 5 * math.pi / 3, 20001)[0]
ok(
    "電通大22-1 f(4π/3)=-(2a+1)、f=2t(2t-1)(t-a)、共有点2個は a=0,1/2、cosβ=1/6、S=(22-2π-9√3)/6",
    _ok22a
    and _cnt22 == [3, 2, 3, 2, 3]
    and len(_loc22) == 1
    and abs(_loc22[0] - 1 / 6) < 1e-5
    and abs(_S22 - (22 - 2 * math.pi - 9 * math.sqrt(3)) / 6) < 1e-8,
    f"f(4π/3) と因数分解は 5 つの a で一致、相異なる t の解は {_cnt22} 個、"
    f"極大での cos x={_loc22[0]:.7f}（1/6={1/6:.7f}）、面積 {_S22:.9f}"
    f"（(22-2π-9√3)/6={(22-2*math.pi-9*math.sqrt(3))/6:.9f}）",
)

_y22 = lambda x: math.sqrt(x) * math.log(x)
_min22 = min(_y22(i / 200000) for i in range(1, 200001))
_g22 = lambda x: math.exp(-x * math.log(x))
_d1_22 = lambda x: (_g22(x + 1e-7) - _g22(x - 1e-7)) / 2e-7
_d2_22 = lambda x: (_g22(x + 1e-5) - 2 * _g22(x) + _g22(x - 1e-5)) / 1e-10
_ok22b = True
for _x in (0.3, 1.0, 2.0):
    if abs(_d1_22(_x) / _g22(_x) - (-1 - math.log(_x))) > 1e-6:
        _ok22b = False
    if abs(_d2_22(_x) / _g22(_x) - ((1 + math.log(_x)) ** 2 - 1 / _x)) > 1e-4:
        _ok22b = False
for _a, _b in ((0.5, 2.0), (1.0, 3.0)):
    _I = quad(lambda x: (1 + math.log(x)) * _g22(x), _a, _b, 20001)[0]
    if abs(_I - (_a ** (-_a) - _b ** (-_b))) > 1e-8:
        _ok22b = False
_ineq22 = []
for _n, _m in ((1, 5), (2, 6), (3, 9)):
    _L = sum(k ** (-k) for k in range(_n + 1, _m + 1))
    _R = (_n ** (-_n) - _m ** (-_m)) / (1 + math.log(_n))
    _ineq22.append(_L < _R)
ok(
    "電通大22-2 値域 [-2/e, 0]、極限は 1 と 0、f'/f=-1-logx、極大 e^(1/e)、∫=a^(-a)-b^(-b) と不等式",
    _ok22b
    and abs(_min22 + 2 / math.e) < 1e-9
    and abs(_g22(1e-9) - 1) < 1e-7
    and _g22(50) < 1e-80
    and abs(_g22(1 / math.e) - math.e ** (1 / math.e)) < 1e-12
    and all(_ineq22),
    f"√x logx の最小 {_min22:.7f}（-2/e={-2/math.e:.7f}）、f(10⁻⁹)={_g22(1e-9):.7f}・f(50)={_g22(50):.1e}、"
    f"極大 {_g22(1/math.e):.9f}（e^(1/e)={math.e**(1/math.e):.9f}）、不等式は {_ineq22}",
)

_a22 = [None, Fraction(12)]
for _n in range(1, 12):
    _a22.append(
        ((3 ** (_n + 1) + 1) * _a22[_n] - 3 ** (_n + 3))
        / (3 ** (_n - 1) * _a22[_n] - (3 ** (_n + 1) - 1))
    )
_b22 = [None] + [Fraction(3) / (_a22[n] - 9) for n in range(1, 12)]
_pr22 = []
_p = Fraction(1)
for _n in range(1, 12):
    _p *= _a22[_n]
    _pr22.append(_p / Fraction(9) ** _n)
ok(
    "電通大22-3 aₙ>9、b_(n+1)-bₙ=3ⁿ、bₙ=(3ⁿ-1)/2、aₙ=9+6/(3ⁿ-1)、α=9・β=3/2",
    all(_a22[n] > 9 for n in range(1, 12))
    and all(_b22[n + 1] - _b22[n] == 3**n for n in range(1, 11))
    and all(_b22[n] == Fraction(3**n - 1, 2) for n in range(1, 12))
    and all(_a22[n] == 9 + Fraction(6, 3**n - 1) for n in range(1, 12))
    and all(
        _pr22[n - 1] == Fraction(3 ** (n + 1) - 1, 2 * 3**n) for n in range(1, 12)
    ),
    f"a₁..a₄={[str(_a22[n]) for n in range(1, 5)]}、bₙ・aₙ・積の式は n=1..11 で一致、"
    f"積/9ⁿ は n=10 で {float(_pr22[9]):.9f}（3/2 に近づく）",
)


def _geo22(h):
    L = math.sqrt(h * h + 2)
    return L, (L - 1) / math.sqrt(1 + h * h), (L - 2) / h, math.sqrt(2) * (L - 1) / h


_ok22d = True
for _h in (0.5, 1.0, math.sqrt(2), 3.0):
    _L, _r, _k, _R = _geo22(_h)
    if abs(_r - math.sqrt(1 + _h * _h) / (1 + _L)) > 1e-12:
        _ok22d = False
    if abs(_R - math.sqrt(1 + _k * _k)) > 1e-12:
        _ok22d = False
_minR22 = min((_geo22(0.001 + i / 100000)[3], 0.001 + i / 100000) for i in range(0, 500000))
_L5, _r5, _k5, _R5 = _geo22(0.5)


def _A22(z):
    rho2 = 2 - (1 + z) ** 2
    if rho2 <= 0:
        return 0.0
    rho = math.sqrt(rho2)
    c = 1 - 2 * z
    if c >= rho:
        return 0.0
    return 4 * (rho2 * math.acos(c / rho) - c * math.sqrt(rho2 - c * c))


_V22 = quad(_A22, 0.0, 0.4, 200001)[0]
ok(
    "電通大22-4 OA=√(h²+2)、r=(√(h²+2)-1)/√(h²+1)、AP=AQ=1、R=√2(√(h²+2)-1)/h、h₀=√2、h=1/2 で KM=3√5/5、V",
    _ok22d
    and abs(_minR22[0] - 1) < 1e-9
    and abs(_minR22[1] - math.sqrt(2)) < 1e-4
    and abs(_R5 - math.sqrt(2)) < 1e-12
    and abs(_k5 + 1) < 1e-12
    and abs(math.sqrt(_R5**2 - _r5**2) - 3 / math.sqrt(5)) < 1e-12
    and abs(_V22 - 4 * math.pi * (100 * math.sqrt(2) - 63 * math.sqrt(5)) / 75) < 1e-9,
    f"r・R の式は h=0.5,1,√2,3 で座標と一致、R の最小 {_minR22[0]:.7f} は h={_minR22[1]:.5f}（√2={math.sqrt(2):.7f}）、"
    f"h=1/2 で R={_R5:.7f}・K の z 座標 {_k5:.1f}・KM={math.sqrt(_R5**2-_r5**2):.7f}（3√5/5={3*math.sqrt(5)/5:.7f}）、"
    f"V={_V22:.9f}（式 {4*math.pi*(100*math.sqrt(2)-63*math.sqrt(5))/75:.9f}）",
)

print()
print("解答の確認: すべて OK" if NG == 0 else f"解答の確認: 要確認 {NG} 件")
raise SystemExit(1 if NG else 0)
