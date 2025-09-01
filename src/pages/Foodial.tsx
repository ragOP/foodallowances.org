import React, { useEffect, useMemo, useState } from "react";

const styles = `
  :root {
    --border:#000;
    --shadow:rgba(0,0,0,.15);
    --accent:#b22222;
    --cta:#e90d0d;
    --ctaBorder:#dd0f0f;
  }

  body.no-body-style { margin:0; }
  .eligibility-root * { box-sizing:border-box; }

  .page-wrap {
    padding:24px;
    background:#f9f9f9;
    color:#111;
    font-family:"Times New Roman", serif;
  }

  .notice {
    max-width:800px;
    margin:auto;
    background:#fff;
    padding:28px;
    border:2px solid var(--border);
    box-shadow:0 4px 16px var(--shadow);
  }

  /* --- Header fixed back to side-by-side --- */
  .header {
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:18px;
    flex-wrap:wrap;
  }
  .seal { font-weight:900; font-size:18px; }
  .date { font-size:14px; color:#222; }

  .title {
    text-align:left;
    font-size:22px;
    font-weight:700;
    margin:12px 0 10px 0;
    text-transform:uppercase;
    letter-spacing:.02em;
  }

  .body p {
    font-size:16px;
    line-height:1.6;
    margin:12px 0;
    text-align:left;
  }
  .highlight { font-weight:700; color:var(--accent); }

  /* --- CTA with improved shimmer --- */
  .cta {
    position:relative;
    display:block;
    width:100%;
    margin:18px 0 8px 0;
    text-align:center;
    background:var(--cta);
    color:#fff;
    font-size:18px;
    font-weight:800;
    padding:16px 14px;
    text-decoration:none;
    border:2px solid var(--ctaBorder);
    border-radius:10px;
    box-shadow:0 6px 18px rgba(233,13,13,.25);
    overflow:hidden;
    transition:transform .08s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .cta:active { transform:scale(.97); }

  /* glossy shimmer effect */
  .cta::before {
    content:"";
    position:absolute;
    top:0; left:-50%;
    width:50%;
    height:100%;
    background:linear-gradient(
      120deg,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0.6) 50%,
      rgba(255,255,255,0) 100%
    );
    transform:skewX(-20deg);
    animation:ctaShimmer 2.2s infinite;
    pointer-events:none;
  }

  @keyframes ctaShimmer {
    0% { left:-60%; }
    60% { left:120%; }
    100% { left:120%; }
  }

  .exp {
    font-size:15px;
    font-weight:700;
    color:var(--accent);
    margin-top:8px;
    text-align:left;
  }

  .footer {
    margin-top:26px;
    font-size:13px;
    color:#333;
    border-top:1px solid #ccc;
    padding-top:12px;
    text-align:left;
  }

  @media (max-width:480px) {
    .page-wrap { padding:14px; }
    .notice { padding:18px; }
    .seal { font-size:16px; }
    .title { font-size:20px; }
    .body p { font-size:15px; }
    .cta { font-size:17px; padding:15px 12px; border-radius:12px; }
    .exp { font-size:14px; }
  }
`;

const formatTime = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
};

const Foodial: React.FC = () => {
  const [remaining, setRemaining] = useState<number>(180);

  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [remaining]);

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    []
  );

  return (
    <div className="eligibility-root">
      <style>{styles}</style>

      <div className="page-wrap">
        <div className="notice">
          <div className="header">
            <div className="seal">⚖ UNITED STATES BENEFIT OFFICE</div>
            <div className="date">DATE: <b>{today}</b></div>
          </div>

          <div className="title">Notice of Eligibility</div>

          <div className="body">
            <p>Dear Citizen,</p>
            <p>
              You may be entitled to receive a Food Allowance Card that reloads with
              <span className="highlight"> $168/month.</span> This benefit has been
              authorized for distribution to qualified seniors on Medicare nationwide.
            </p>
            <p>
              Our records indicate that you might be eligible. To confirm, please
              complete a short verification process immediately.
            </p>
            <p>
              <b>Action Required:</b> Contact a licensed agent before your reservation
              expires. Failure to act before the expiration date may result in forfeiture.
            </p>

            <a href="tel:+13214858035" className="cta">
              CALL (321) 485-8035 TO CLAIM
            </a>

            <div className="exp">
              {remaining > 0
                ? `⚠ Reservation Expires in: ${formatTime(remaining)}`
                : "❌ Reservation Expired"}
            </div>

            <p>
              By contacting the number above, you will be connected with a licensed
              representative who can confirm your details and secure your $168/month
              Food Allowance Card.
            </p>
          </div>

          <div className="footer">
            This document is an official eligibility notice. Distribution is limited.
            © 2025 United States Benefit Office. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foodial;
