import { useState } from 'react';

interface SettingsPanelProps {
  apiKey: string;
  onSave: (key: string) => void;
}

export function SettingsPanel({ apiKey, onSave }: SettingsPanelProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(apiKey);

  function save() {
    onSave(draft.trim());
    setOpen(false);
  }

  function clear() {
    setDraft('');
    onSave('');
  }

  return (
    <div className="settings">
      <button type="button" className="settings-toggle" onClick={() => setOpen((o) => !o)}>
        {apiKey ? 'Live search: on' : 'Settings'}
      </button>
      {open && (
        <div className="settings-panel">
          <h3>Anthropic API key</h3>
          <p>
            Optional. When set, any search that doesn't match the curated real-poll dataset is sent directly from
            your browser to Claude with live web search enabled, to try to find a real, cited poll that isn't in
            the curated dataset yet. Without a key, a search with no real match is simply declined. Your key is
            stored only in this browser's local storage and sent only to Anthropic's API — never to any Poll Finder
            server (this app has none). Usage is billed to your own Anthropic account.
          </p>
          <input
            type="password"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="sk-ant-..."
            className="settings-input"
            autoComplete="off"
          />
          <div className="settings-actions">
            <button type="button" className="settings-save" onClick={save}>
              Save
            </button>
            {apiKey && (
              <button type="button" className="settings-clear" onClick={clear}>
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
