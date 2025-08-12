

interface CalendarEvent {
    id: string;
    start: Date;
    end: Date;
    title: string;
    description: string;
    url: string;
}

/**
 * Creates an .ics file content string for a calendar event.
 * @param event - The event details.
 * @returns The .ics file content as a string.
 */
export function createIcsFile(event: CalendarEvent): string {
    const formatDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//SkillzUp//Priyanshus App//EN',
        'BEGIN:VEVENT',
        `UID:${event.id}@skillzup.app`,
        `DTSTAMP:${formatDate(new Date())}`,
        `DTSTART:${formatDate(event.start)}`,
        `DTEND:${formatDate(event.end)}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `URL;VALUE=URI:${event.url}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\n');

    return icsContent;
}
