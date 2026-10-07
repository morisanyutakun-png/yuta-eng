import Image from "next/image";

/**
 * 表紙を少し重ねて並べたもの。
 *
 * ページ見出しの横に置く。線画の記号を置いていたが、
 * 何を表しているのか分からないうえに、素っ気なく見えていた。
 * このサイトの実体は刊行している本なので、**実物の表紙**を出す。
 * 架空の飾りではなく、そのページから辿れる本をそのまま並べる。
 *
 * 読み上げには出さない。表紙の内容は見出しと本文で必ず書いてあり、
 * ここで題名を読み上げても同じことを二度聞かせるだけになる。
 */
export function CoverFan({
  covers,
  className = "",
  priority = false,
}: {
  /** 左から奥、右へ手前。3枚までにする */
  covers: string[];
  className?: string;
  priority?: boolean;
}) {
  const list = covers.slice(0, 3);
  if (list.length === 0) return null;

  return (
    <span aria-hidden="true" className={`flex items-end ${className}`}>
      {list.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={160}
          height={226}
          priority={priority && i === list.length - 1}
          loading={priority && i === list.length - 1 ? undefined : "lazy"}
          sizes="88px"
          className={[
            "w-[42px] border border-rule bg-white object-cover shadow-[0_1px_3px_rgba(21,24,28,0.10)] sm:w-[58px] lg:w-[66px]",
            // 奥の2枚は少し下げて重ねる。手前ほど大きく見えるようにする
            i < list.length - 1 ? "-mr-3.5 mb-1 sm:-mr-5 sm:mb-1.5 lg:-mr-6" : "",
          ].join(" ")}
        />
      ))}
    </span>
  );
}
