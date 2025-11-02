interface UserCardProps {
  user: any;
}

export default function UserCard({ user }: UserCardProps) {
  if (!user) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8 max-w-lg mx-auto text-center">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-500"
      />
      <h2 className="text-2xl font-bold mt-4">{user.name || user.login}</h2>
      <p className="text-gray-500 mt-2">{user.bio || "No bio available"}</p>
      <div className="flex justify-center gap-6 mt-4">
        <div>
          <span className="font-semibold">{user.public_repos}</span> Repos
        </div>
        <div>
          <span className="font-semibold">{user.followers}</span> Followers
        </div>
      </div>
    </div>
  );
}
