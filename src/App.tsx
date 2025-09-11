function App() {
  return (
    <main className='min-h-screen grid place-items-center p-6'>
      <div className='card w-full max-w-xl bg-base-200 shadow-xl'>
        <div className='card-body'>
          <h1 className='card-title'>IP Address Tracker</h1>

          <div className='join w-full'>
            <input
              type='text'
              placeholder='Enter IP or domain'
              className='input input-bordered join-item w-full'
            />
            <button className='btn btn-primary join-item'>Search</button>
          </div>

          <div className='stats stats-vertical lg:stats-horizontal shadow mt-4'>
            <div className='stat'>
              <div className='stat-title'>IP</div>
              <div className='stat-value text-primary'>–</div>
            </div>
            <div className='stat'>
              <div className='stat-title'>Location</div>
              <div className='stat-value'>–</div>
            </div>
            <div className='stat'>
              <div className='stat-title'>ISP</div>
              <div className='stat-value'>–</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
