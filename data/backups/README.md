# Automatic Backup System

This directory contains automatic backups of all JSON data files from the admin panel.

## How It Works

Every time you save changes in the admin panel (for any module like About, Blogs, Portfolio, etc.), the system automatically:

1. Creates a backup of the current file before saving
2. Names it with a timestamp: `filename_YYYY-MM-DD_HH-MM-SS.json`
3. Stores it in this directory

## Backup Naming Convention

Format: `{original-name}_{timestamp}.json`

Example:
- `blogs_2025-11-10_14-30-45.json` - Backup of blogs.json created on Nov 10, 2025 at 2:30:45 PM

## Managing Backups

You can manage backups through the admin panel:

1. **View Backups**: Navigate to Configuration → Backups
2. **Restore**: Click "Restore" next to any backup to revert to that version
3. **Delete**: Remove old backups to free up space

## Important Notes

- Backups are created automatically - no manual action needed
- Each save operation creates a new backup
- Old backups are NOT automatically deleted - manage them manually
- Restoring a backup creates a backup of the current version first
- All backup operations are logged in the server console

## Storage Considerations

Backups accumulate over time. Consider:
- Reviewing and deleting old backups periodically
- Keeping only critical versions
- Exporting important backups to external storage

## Technical Details

- Location: `data/backups/`
- Managed by: Express server (`admin/server/index.js`)
- API Endpoints:
  - `GET /api/backups` - List all backups
  - `POST /api/backups/restore` - Restore from backup
  - `DELETE /api/backups/:filename` - Delete a backup
