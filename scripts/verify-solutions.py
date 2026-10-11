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

print()
print("解答の確認: すべて OK" if NG == 0 else f"解答の確認: 要確認 {NG} 件")
raise SystemExit(1 if NG else 0)
