import { useEffect, useState } from "react";
import request from "../../api/api";
import "./Events.css";

const fallbackItems = [
    {
        title: "Quarterly Town Hall",
        event_type: "event",
        event_date: "2026-06-18",
        event_time: "10:30 AM",
        description: "All teams are invited to the quarterly review meeting and project roadmap update.",
    },
    {
        title: "Server Maintenance Window",
        event_type: "notice",
        event_date: "2026-06-20",
        event_time: "11:00 PM - 1:00 AM",
        description: "The system will be under scheduled maintenance. Please save your work before the window begins.",
    },
    {
        title: "Policy Update",
        event_type: "notice",
        event_date: "2026-06-25",
        event_time: "All Day",
        description: "New access and reporting guidelines will be shared with department heads and team leads.",
    },
];

const Events = () => {
    const [noticeItems, setNoticeItems] = useState(fallbackItems);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        event_type: "notice",
        event_date: "",
        event_time: "",
        description: "",
    });
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState("");
    const role = localStorage.getItem("role") || "";

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await request("/api/tasks/events/");
                if (Array.isArray(data) && data.length > 0) {
                    setNoticeItems(data);
                }
            } catch (error) {
                console.error("Failed to load events", error);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setFeedback("");

        try {
            const newItem = await request("/api/tasks/events/", {
                method: "POST",
                body: formData,
            });

            setNoticeItems((prev) => [newItem, ...prev]);
            setFormData({ title: "", event_type: "notice", event_date: "", event_time: "", description: "" });
            setFeedback("Notice/Event added successfully.");
        } catch (error) {
            setFeedback(error.detail || "Unable to add notice/event right now.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="events-page">
            <header className="events-header">
                <div>
                    <p className="eyebrow">Latest updates</p>
                    <h2>Events & Notices</h2>
                    <p className="subtle-text">
                        Keep track of meetings, maintenance schedules, and important announcements in one place.
                    </p>
                </div>
                <div className="events-pill">Live updates</div>
            </header>

            {loading ? <p className="subtle-text">Loading events…</p> : null}

            {role === "admin" && (
                <form className="events-form" onSubmit={handleSubmit}>
                    <div>
                        <h3>Add New Notice / Event</h3>
                        <p className="subtle-text">Admins can publish a new update directly from this page.</p>
                    </div>

                    <label>
                        Title
                        <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                    </label>

                    <label>
                        Type
                        <select value={formData.event_type} onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}>
                            <option value="event">Event</option>
                            <option value="notice">Notice</option>
                        </select>
                    </label>

                    <label>
                        Date
                        <input type="date" value={formData.event_date} onChange={(e) => setFormData({ ...formData, event_date: e.target.value })} required />
                    </label>

                    <label>
                        Time
                        <input value={formData.event_time} onChange={(e) => setFormData({ ...formData, event_time: e.target.value })} placeholder="10:30 AM" />
                    </label>

                    <label>
                        Description
                        <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" required />
                    </label>

                    <button className="save-btn" type="submit" disabled={saving}>
                        {saving ? "Saving..." : "Save Notice / Event"}
                    </button>
                    {feedback ? <p className="feedback-text">{feedback}</p> : null}
                </form>
            )}

            <div className="events-grid">
                {noticeItems.map((item) => (
                    <article className="event-card" key={`${item.title}-${item.event_date}`}>
                        <span className={`badge ${item.event_type?.toLowerCase() || "notice"}`}>
                            {item.event_type || "Notice"}
                        </span>
                        <h3>{item.title}</h3>
                        <p className="meta">{item.event_date} • {item.event_time}</p>
                        <p className="description">{item.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Events;
