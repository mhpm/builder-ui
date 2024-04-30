import { useState } from 'react';
import './App.css';
import { BfsButton } from './components';

function App() {
  const [loading, setLoading] = useState()
  return (
    <div className="App">
      <header className="App-header">
        <BfsButton label="primary" onClick={() => setLoading(!loading)} />
        <BfsButton loading={loading} spinner="cog" mode="secondary" label="secondary" />
        <BfsButton loading={loading} spinner="cog" mode="negative" label="negative" />
        <BfsButton loading={loading} spinner="cog" mode="positive" label="positive" />
        <BfsButton loading={loading} spinner="cog" mode="primaryGhost" label="primaryGhost" />
        <BfsButton loading={loading} spinner="cog" mode="secondaryGhost" label="secondaryGhost" />
        <BfsButton loading={loading} spinner="cog" mode="negativeGhost" label="negativeGhost" />
        <BfsButton loading={loading} spinner="cog" mode="positiveGhost" label="positiveGhost" />
        <BfsButton loading={loading} spinner="cog" />
        <BfsButton loading={loading} spinner="cog" label="some" />
        <BfsButton fluid loading={loading} spinner="cog" />

        <div>
    <div>
      <BfsButton mode="primary" label="primary" />
      <BfsButton mode="secondary" label="secondary" />
      <BfsButton mode="negative" label="negative" />
      <BfsButton mode="positive" label="positive" />
    </div>
    <div>
      <BfsButton mode="primary" label="primary" disabled />
      <BfsButton mode="secondary" label="secondary" disabled />
      <BfsButton mode="negative" label="negative" disabled />
      <BfsButton mode="positive" label="positive" disabled />
    </div>
    <div>
      <BfsButton mode="primary" label="primary" loading />
      <BfsButton mode="secondary" label="secondary" loading />
      <BfsButton mode="negative" label="negative" loading />
      <BfsButton mode="positive" label="positive" loading />
    </div>
    <div>
      <BfsButton mode="primary" label="primary" loading disabled />
      <BfsButton mode="secondary" label="secondary" loading disabled />
      <BfsButton mode="negative" label="negative" loading disabled />
      <BfsButton mode="positive" label="positive" loading disabled />
    </div>
    <div>
      <BfsButton mode="primaryGhost" label="primary ghost" />
      <BfsButton mode="secondaryGhost" label="secondary ghost" />
      <BfsButton mode="negativeGhost" label="negative ghost" />
      <BfsButton mode="positiveGhost" label="positive ghost" />
    </div>
    <div>
      <BfsButton mode="primaryGhost" label="primary ghost" disabled />
      <BfsButton mode="secondaryGhost" label="secondary ghost" disabled />
      <BfsButton mode="negativeGhost" label="negative ghost" disabled />
      <BfsButton mode="positiveGhost" label="positive ghost" disabled />
    </div>
    <div>
      <BfsButton mode="primaryGhost" label="primary ghost" loading />
      <BfsButton mode="secondaryGhost" label="secondary ghost" loading />
      <BfsButton mode="negativeGhost" label="negative ghost" loading />
      <BfsButton mode="positiveGhost" label="positive ghost" loading />
    </div>
    <div>
      <BfsButton mode="primaryGhost" label="primary ghost" loading disabled />
      <BfsButton
        mode="secondaryGhost"
        label="secondary ghost"
        loading
        disabled
      />
      <BfsButton mode="negativeGhost" label="negative ghost" loading disabled />
      <BfsButton mode="positiveGhost" label="positive ghost" loading disabled />
    </div>
  </div>
      </header>
    </div>
  );
}

export default App;
