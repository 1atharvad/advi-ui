import { Button } from "@/components/ui/button";

export const PageNotFound = () => {
  return (
    <div className="vi-pnf">
      <div className="vi-pnf-bg-gradient" />

      <div className="vi-pnf-orb-gold" />
      <div className="vi-pnf-orb-green" />

      <div className="vi-pnf-content">
        <div className="vi-pnf-404-wrap">
          <h1 className="vi-pnf-404">404</h1>
          <div className="vi-pnf-404-glow" />
        </div>

        <div className="vi-pnf-message">
          <h2 className="vi-pnf-title">Page Not Found</h2>
          <p className="vi-pnf-subtitle">
            Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="vi-pnf-actions">
          <Button asChild size="lg" className="vi-pnf-btn group">
            <a href="/">
              <span className="vi-pnf-btn-inner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 19-7-7 7-7"/>
                  <path d="M19 12H5"/>
                </svg>
                Back to Home
              </span>
            </a>
          </Button>
        </div>
      </div>

      <div className="vi-pnf-divider" />
    </div>
  );
}
