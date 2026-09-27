import { useMemo, useState } from "react";
import "./TourGuide.css";

const guideSteps = [
    {
        title: "Welcome to the dashboard",
        detail: "Use the dashboard to view system activity, recent updates, and quick access to major sections.",
    },
    {
        title: "Navigate with the sidebar",
        detail: "Open the menu items on the left to switch between Dashboard, Users, Reports, Settings, and Help.",
    },
    {
        title: "Review your role-based tools",
        detail: "Admins manage users and permissions, Managers track team approvals, and Users monitor tasks and profile settings.",
    },
    {
        title: "Check notices and updates",
        detail: "Visit the Events & Notices section to stay informed about meetings, maintenance windows, and important announcements.",
    },
];

const TourGuide = () => {
    const [stepIndex, setStepIndex] = useState(0);
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);

    const activeStep = useMemo(() => guideSteps[stepIndex] ?? guideSteps[0], [stepIndex]);

    const startTour = () => {
        setStarted(true);
        setCompleted(false);
        setStepIndex(0);
    };

    const nextStep = () => {
        setStepIndex((prev) => {
            if (prev + 1 < guideSteps.length) {
                return prev + 1;
            }

            setCompleted(true);
            return prev;
        });
    };

    const prevStep = () => {
        setStepIndex((prev) => {
            const nextValue = prev > 0 ? prev - 1 : 0;
            setCompleted(false);
            return nextValue;
        });
    };

    const finishTour = () => {
        setStarted(false);
        setCompleted(true);
        setStepIndex(0);
    };

    const resetTour = () => {
        setStarted(false);
        setCompleted(false);
        setStepIndex(0);
    };

    return (
        <section className="tour-guide-page">
            <header className="tour-guide-header">
                <div>
                    <p className="eyebrow">Getting started</p>
                    <h2>Tour Guide</h2>
                    <p className="subtle-text">
                        A quick walkthrough of the main features and how to move around the RBAP dashboard.
                    </p>
                </div>
                <div className="tour-badge">New user help</div>
            </header>

            {!started ? (
                <article className="tour-card highlight-card intro-card">
                    <h3>Start your guided tour</h3>
                    <p>
                        This guided tour will walk you through the main dashboard areas and the role-based tools available to you.
                    </p>
                    <button className="tour-btn" onClick={startTour}>
                        Start Tour
                    </button>
                    {completed ? (
                        <p className="tour-complete-note">Tour completed — you can restart anytime for a quick refresher.</p>
                    ) : null}
                </article>
            ) : (
                <article className="tour-card tour-step-card">
                    <div className="tour-progress-wrap">
                        <div className="tour-progress-label">
                            <span className="step-label">Step {stepIndex + 1} of {guideSteps.length}</span>
                            <strong>{Math.round(((stepIndex + 1) / guideSteps.length) * 100)}% complete</strong>
                        </div>
                        <div className="tour-progress-bar" aria-hidden="true">
                            <span style={{ width: `${((stepIndex + 1) / guideSteps.length) * 100}%` }} />
                        </div>
                    </div>
                    <h3>{activeStep.title}</h3>
                    <p>{activeStep.detail}</p>
                    <div className="tour-actions">
                        <button className="tour-btn secondary" onClick={prevStep} disabled={stepIndex === 0}>
                            Previous
                        </button>
                        <button
                            className="tour-btn"
                            onClick={stepIndex === guideSteps.length - 1 ? finishTour : nextStep}
                            disabled={false}
                        >
                            {stepIndex === guideSteps.length - 1 ? "Finish Tour" : "Next"}
                        </button>
                    </div>
                    <button className="tour-btn ghost" onClick={resetTour}>Restart Tour</button>
                </article>
            )}

            <div className="tour-grid">
                {guideSteps.map((step, index) => (
                    <article
                        className={`tour-card ${started && stepIndex === index ? "tour-current" : ""}`}
                        key={step.title}
                        onClick={() => started && setStepIndex(index)}
                        role={started ? "button" : undefined}
                        tabIndex={started ? 0 : undefined}
                        onKeyDown={(event) => {
                            if (started && (event.key === "Enter" || event.key === " ")) {
                                event.preventDefault();
                                setStepIndex(index);
                            }
                        }}
                    >
                        <span className="step-number">0{index + 1}</span>
                        <h3>{step.title}</h3>
                        <p>{step.detail}</p>
                        {started && stepIndex === index ? <p className="current-tip">Current focus</p> : null}
                    </article>
                ))}
            </div>

            <article className="tour-card tips-card">
                <h3>Quick tips</h3>
                <ul>
                    <li>Use the sidebar to jump between modules quickly.</li>
                    <li>Check Events & Notices often for important updates.</li>
                    <li>Use your role-specific pages to manage tasks, approvals, or users.</li>
                </ul>
            </article>
        </section>
    );
};

export default TourGuide;
