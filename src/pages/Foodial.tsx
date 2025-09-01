import React, { useEffect, useMemo, useState } from "react";

const styles = `
  :root { --border:#000; --shadow:rgba(0,0,0,.15); --accent:#b22222; --cta:#e90d0d; --ctaBorder:#dd0f0f; }
  body.no-body-style { margin:0; }
  .page-wrap { padding:40px; background:#f9f9f9; color:#111; font-family:"Times New Roman", serif; }
  .notice {
    max-width:800px; margin:auto; background:#fff; padding:40px;
    border:2px solid var(--border); box-shadow:0 4px 16px var(--shadow);
  }
  .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; }
  .seal { font-weight:900; font-size:20px; }
  .date { font-size:14px; }
  .title { text-align:center; font-size:22px; font-weight:700; margin:20px 0; text-transform:uppercase; }
  .body p { font-size:16px; line-height:1.6; margin:14px 0; }
  .highlight { font-weight:700; color:var(--accent); }
  .cta {
    display:block; width:100%; margin:20px 0; text-align:center;
    background:var(--cta); color:#fff; font-size:18px; font-weight:700; padding:14px;
    text-decoration:none; border:2px solid var(--ctaBorder); transition:background .2s ease;
  }
  .cta:hover { background:#333; }
  .exp { font-size:16px; font-weight:700; color:var(--accent); margin-top:10px; text-align:center; }
  .footer {
    margin-top:40px; font-size:13px; color:#333; border-top:1px solid #ccc; padding-top:12px;
  }

  /* Container-only reset for embedding inside existing apps */
  .eligibility-root * { box-sizing:border-box; }
`;

const formatTime = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
};

const Foodial: React.FC = () => {
  // Start from 3 minutes = 180 seconds
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
      {/* Local styles for this component only */}
      <style>{styles}</style>

      <div className="page-wrap">
        <div className="notice">
          <div className="header">
            <div className="seal">⚖ UNITED STATES BENEFIT OFFICE</div>
            <div className="date">
              DATE: <b>{today}</b>
            </div>
          </div>

          <div className="title">Notice of Eligibility</div>

          <div className="body">
            <p>Dear Citizen,</p>
            <p>
              You may be entitled to receive a{" "}
              <span className="highlight">$25,000 Funeral Benefit</span> to
              cover final expenses. This benefit has been authorized for
              distribution to qualified seniors nationwide.
            </p>
            <p>
              Our records indicate that you may be eligible. To confirm, please
              complete a short verification process immediately.
            </p>

            <p>
              <b>Action Required:</b> Contact a licensed agent before your
              reservation expires. Failure to act before the expiration date may
              result in forfeiture of benefits.
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
              By contacting the number above, you will be connected with a
              licensed representative who can confirm your details and secure
              your $25,000 coverage.
            </p>
          </div>

          <div className="footer">
            This document is an official eligibility notice. Distribution is
            limited. © 2025 United States Benefit Office. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foodial;
