/** 要点は外に残し、補足だけを開ける。JavaScriptなしでも操作できる。 */
export function InfoDetails({ title, children, className = "" }: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <details className={`info-details mt-4 border border-rule bg-white ${className}`}>
      <summary className="cursor-pointer px-4 py-3 text-[0.86rem] font-semibold leading-relaxed text-navy">{title}</summary>
      <div className="border-t border-rule px-4 pb-4 pt-3 sm:px-5">{children}</div>
    </details>
  );
}
