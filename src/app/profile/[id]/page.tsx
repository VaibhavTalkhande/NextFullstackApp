export default function UserProfile({params}: any){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <hr />
            <p className="text-4xl">{params.id}
             <span className="text-2xl p-2 rounded bg-orange-500  ml-2 text-black font-semibold"> hub</span>
                
            </p>
        </div>
    );
}