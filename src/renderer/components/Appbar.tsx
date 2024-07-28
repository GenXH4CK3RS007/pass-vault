import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function Appbar() {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  return (
    <div className="flex items-center h-12 border-b px-4 space-x-1">
      <button
        className="font-emph text-xl"
        type="button"
        onClick={() => navigate('/')}
      >
        PassVault
      </button>
      <div className="flex-grow" />
      <button
        className="rounded px-2 py-1 border flex items-center space-x-2 hover:bg-slate-100"
        type="button"
        onClick={() => {
          navigate('/new-password');
        }}
      >
        <p>New</p>
        <span className="material-symbols-rounded font-bold">add</span>
      </button>
      <button
        className="rounded px-2 py-1 border flex items-center space-x-2 hover:bg-slate-100"
        type="button"
        onClick={() => {
          navigate('/add-existing-password');
        }}
      >
        <p>Add Existing</p>
        <span className="material-symbols-rounded font-bold">add</span>
      </button>
      <button
        className="rounded px-2 py-1 border flex items-center space-x-2 hover:bg-slate-100"
        type="button"
        onClick={() => {
          authContext.logout!();
        }}
      >
        <p>Sign Out</p>
        <span className="material-symbols-rounded font-bold">logout</span>
      </button>
    </div>
  );
}
