import { returnSample, returnStatistics, returnTotals } from "@/lib/moshi/return";

const point = (radius: number, index: number) => {
  const angle = (-90 + index * 72) * Math.PI / 180;
  return { x: 190 + radius * Math.cos(angle), y: 143 + radius * Math.sin(angle) };
};
const polygon = (radii: number[]) => radii.map((radius, index) => {
  const { x, y } = point(radius, index);
  return `${x.toFixed(2)},${y.toFixed(2)}`;
}).join(" ");

/** 答案の5観点。分野別得点率とは別の、採点者による100点換算評価の見本。 */
export function ReturnRadar() {
  const skills = returnSample.skills;
  return (
    <svg viewBox="0 0 380 285" role="img" aria-label={`答案の5観点評価（架空例）：${skills.map((skill) => `${skill.label}${skill.score}`).join("、")}`} className="mx-auto w-full max-w-[25rem]">
      <title>数学の学習到達度・5観点バランスチャート</title>
      {[20, 40, 60, 80, 100].map((level) => (
        <polygon key={level} points={polygon(Array(5).fill(78 * level / 100))} fill="none" stroke="#b9c9d6" strokeWidth="0.8" />
      ))}
      {skills.map((skill, index) => {
        const end = point(78, index);
        const label = point(108, index);
        return (
          <g key={skill.label}>
            <line x1="190" y1="143" x2={end.x} y2={end.y} stroke="#b9c9d6" strokeWidth="0.8" />
            <text x={label.x} y={label.y - 4} textAnchor={index === 0 ? "middle" : index < 3 ? "start" : "end"} fontSize="11" fill="#253440">
              <tspan>{skill.label}</tspan>
              <tspan x={label.x} dy="16" fill="#366c97" fontSize="13" fontWeight="600">{skill.score}</tspan>
            </text>
          </g>
        );
      })}
      <polygon points={polygon(skills.map((skill) => 78 * skill.score / 100))} fill="#366c97" fillOpacity="0.17" stroke="#366c97" strokeWidth="1.8" />
      {skills.map((skill, index) => {
        const dot = point(78 * skill.score / 100, index);
        return <circle key={skill.label} cx={dot.x} cy={dot.y} r="2.8" fill="#366c97" />;
      })}
      {[20, 60, 100].map((level) => <text key={level} x="194" y={143 - 78 * level / 100 + 4} fontSize="9" fill="#596b79">{level}</text>)}
    </svg>
  );
}

export function ReturnDistribution() {
  const { bins, mean, count } = returnStatistics;
  const top = Math.max(...bins.map((bin) => bin.count));
  const averageX = 32 + mean / returnTotals.max * 312;
  return (
    <svg viewBox="0 0 360 152" role="img" aria-label={`架空の受験者${count}名の得点分布。${bins.map((bin) => `${bin.lower}〜${bin.upper}点：${bin.count}名`).join("、")}。あなたの得点は${returnTotals.score}点、平均は${mean.toFixed(1)}点。`} className="w-full">
      <title>得点分布（数学・架空集団）</title>
      <line x1="32" y1="113" x2="344" y2="113" stroke="#b9c9d6" />
      {bins.map((bin, index) => {
        const height = bin.count / top * 72;
        const selected = returnTotals.score >= bin.lower && returnTotals.score <= bin.upper;
        return (
          <g key={bin.lower}>
            <rect x={39 + index * 52} y={113 - height} width="38" height={height} fill={selected ? "#366c97" : "#c7d6e1"} />
            <text x={58 + index * 52} y={106 - height} textAnchor="middle" fontSize="11" fill="#596b79">{bin.count}</text>
            <text x={58 + index * 52} y="132" textAnchor="middle" fontSize="10" fill="#596b79">{bin.lower}–{bin.upper}</text>
          </g>
        );
      })}
      <line x1={averageX} y1="30" x2={averageX} y2="113" stroke="#596b79" strokeDasharray="3 3" />
      <text x="32" y="17" fontSize="11" fill="#596b79">人数（名）／平均 {mean.toFixed(1)}点</text>
      <text x="344" y="17" textAnchor="end" fontSize="11" fontWeight="600" fill="#366c97">あなた {returnTotals.score}点</text>
      <text x="344" y="148" textAnchor="end" fontSize="10" fill="#596b79">得点（点）</text>
    </svg>
  );
}
