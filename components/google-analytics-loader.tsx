type Props = { measurementId: string };

export function GoogleAnalyticsLoader({ measurementId }: Props) {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
          window.__nobitGa4Configured = true;
          window.__nobitGa4PageViewQueued = true;
        `,
        }}
      />
    </>
  );
}
