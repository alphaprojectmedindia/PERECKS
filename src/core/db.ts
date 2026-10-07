/**
 * PERCKS Kidney Companion — IndexedDB Client Layer (idb)
 * Provides resilient, offline-first local persistence.
 */

import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { MeasurementRecord, LabRecord, UserProfile, UserConsents, PointsState } from './types';

interface PercksDBSchema extends DBSchema {
  profile: {
    key: string;
    value: UserProfile;
  };
  consents: {
    key: string;
    value: UserConsents;
  };
  measurements: {
    key: string;
    value: MeasurementRecord;
    indexes: { 'by-type': string; 'by-date': string };
  };
  labs: {
    key: string;
    value: LabRecord;
    indexes: { 'by-test': string; 'by-date': string };
  };
  points: {
    key: string;
    value: PointsState;
  };
  sync_queue: {
    key: string;
    value: { id: string; action: string; payload: unknown; timestamp: string };
  };
}

const DB_NAME = 'percks_kidney_companion_db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<PercksDBSchema>> | null = null;

export function getPercksDB() {
  if (!dbPromise) {
    dbPromise = openDB<PercksDBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('profile')) {
          db.createObjectStore('profile');
        }
        if (!db.objectStoreNames.contains('consents')) {
          db.createObjectStore('consents');
        }
        if (!db.objectStoreNames.contains('measurements')) {
          const measureStore = db.createObjectStore('measurements', { keyPath: 'id' });
          measureStore.createIndex('by-type', 'type');
          measureStore.createIndex('by-date', 'takenAt');
        }
        if (!db.objectStoreNames.contains('labs')) {
          const labStore = db.createObjectStore('labs', { keyPath: 'id' });
          labStore.createIndex('by-test', 'testName');
          labStore.createIndex('by-date', 'sampleDate');
        }
        if (!db.objectStoreNames.contains('points')) {
          db.createObjectStore('points');
        }
        if (!db.objectStoreNames.contains('sync_queue')) {
          db.createObjectStore('sync_queue', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

export async function saveMeasurementOffline(record: MeasurementRecord): Promise<void> {
  const db = await getPercksDB();
  await db.put('measurements', record);
}

export async function getAllMeasurementsOffline(): Promise<MeasurementRecord[]> {
  const db = await getPercksDB();
  return await db.getAll('measurements');
}

export async function clearAllLocalData(): Promise<void> {
  const db = await getPercksDB();
  await db.clear('measurements');
  await db.clear('labs');
  await db.clear('profile');
  await db.clear('consents');
  await db.clear('points');
  await db.clear('sync_queue');
}
