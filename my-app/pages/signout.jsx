
import { signOut } from 'next-auth/react';

const SignOutPage = () => {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' }); 
  };

  return (
    <div style={{ maxWidth: '600px', paddingLeft: '400px', paddingBottom:"50px", border: '5px solid #ddd', borderRadius: '50px', marginLeft:"200px", marginTop:"50px" }}  >
      <button onClick={handleSignOut} style={{border:"1px solid", marginLeft:"50px"}} >Sign Out</button>
    </div>
  );
};

export default SignOutPage;
