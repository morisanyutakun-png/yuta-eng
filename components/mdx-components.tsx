import type { ComponentPropsWithoutRef } from "react";

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="scroll-mt-24" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="scroll-mt-24" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a rel="noreferrer noopener" target={props.href?.startsWith("http") ? "_blank" : undefined} {...props} />
  ),
};
