type ConsentDefault = "granted" | "denied";

type Props = {
  measurementId: string;
  googleAdsId?: string;
  consentDefault?: ConsentDefault;
};

export function GoogleAnalyticsLoader({
  measurementId,
  googleAdsId,
  consentDefault = "granted",
}: Props) {
  const config = {
    measurementId,
    googleAdsId,
    consentDefault,
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function(config){
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){dataLayer.push(arguments);}
            if (window.__nobitGoogleTagConfigured) return;
            gtag('consent', 'default', {
              ad_storage: config.consentDefault,
              analytics_storage: config.consentDefault,
              ad_user_data: config.consentDefault,
              ad_personalization: config.consentDefault
            });
            gtag('js', new Date());
            gtag('config', config.measurementId, { send_page_view: false });
            if (config.googleAdsId) gtag('config', config.googleAdsId);
            window.__nobitGoogleTagConfigured = true;
          })(${JSON.stringify(config)});
        `,
        }}
      />
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
    </>
  );
}
