package com.jonkers.webheroapi.models;

import java.util.List; /**
 * Represents the structure of a rhythm game .chart file.
 */
public class Chart {
    public ChartMetadata metadata;
    public List<SyncTrackEvent> syncTrack;
    public List<ChartEvent> events;
    public List<Note> expertSingle;

    /**
     * Metadata about the song and chart.
     */
    public static class ChartMetadata {
        public String name;
        public String artist;
        public String charter;
        public String album;
        public String year;
        public int offset;
        public int resolution;
        public String player2;
        public int difficulty;
        public int previewStart;
        public int previewEnd;
        public String genre;
        public String mediaType;
        public String musicStream;
    }

    /**
     * Represents a single note or event in a track section (like [ExpertSingle]).
     * This combined class handles Notes (N), Star Power (S), and Force Events (E 1 0/E 2 0).
     */
    public static class Note {
        public int tick;
        public String type; // N, S, or E
        public Integer fret; // Null for S or E events
        public Integer duration; // Duration in ticks (0 for a strum note)
    }

    /**
     * Represents a synchronization event (BPM or Time Signature change).
     */
    public static class SyncTrackEvent {
        public int tick;
        public String type; // "B" for BPM, "TS" for Time Signature
        public int value; // BPM * 1000 or the Time Signature numerator
    }

    /**
     * Represents a general chart event (lyrics, section names).
     */
    public static class ChartEvent {
        public int tick;
        public String type; // "E" for Event
        public String value; // The actual event string (e.g., "\"section Chorus 1\"")
    }
}
