import React, { useState, useEffect } from 'react';
import CardView from './components/CardView';
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube, FaDiscord, FaTiktok, FaTv, FaCircle, FaEye, FaCalendar, FaGlobe, FaCreditCard, FaVideo, FaHome, FaCrown, FaSpinner } from 'react-icons/fa';

const Home = () => {
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchUsername, setSearchUsername] = useState('');

  const fetchUserData = async (username) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://kick.com/api/v1/channels/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      console.log(data);
      setUserData({
        username: data.user.username,
        avatar_image: data.banner_image.url,
        profile_picture: data.user.profile_pic,
        bio: data.user.bio || 'N/A',
        followers_count: data.followersCount,
        verified: data.verified !== null,
        channel_name: data.slug,
        is_live: data.livestream !== null,
        viewer_count: data.livestream ? data.livestream.viewer_count : 0,
        created_at: data.user.created_at || 'N/A',	
        country: data.user.country || 'N/A',
        twitter: data.user.twitter || 'N/A',
        instagram: data.user.instagram || 'N/A',
        facebook: data.user.facebook || 'N/A',
        youtube: data.user.youtube || 'N/A',
        discord: data.user.discord || 'N/A',
        tiktok: data.user.tiktok || 'N/A',
        subscriber_badges: data.subscriber_badges,
        recent_categories: data.recent_categories,
        chatroom: data.chatroom,
        muted: data.muted,
        subscription_enabled: data.subscription_enabled,
        vod_enabled: data.vod_enabled,
        can_host: data.can_host,
        role: data.role || 'N/A',
        playback_url: data.playback_url,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('No user with this name ! ');
      setLoading(false);
    }
  };



  const handleSearch = (e) => {
    e.preventDefault();
    if (searchUsername) {
      fetchUserData(searchUsername);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src="https://kick.com/favicon.ico" alt="Kick Logo" className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">KickDash by ABNS</span>
          </div>
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              placeholder="Enter username"
              className="px-4 py-2 border border-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-800 text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin" /> : 'Search'}
            </button>
          </form>
        </div>
      </nav>
      <div className="p-8">
        {error && <p className="text-center text-xl text-red-500">{error}</p>}
        <div className="w-4/5 mx-auto bg-gray-900 rounded-lg shadow-lg overflow-hidden">



          <div className="md:flex flex-col">
            <div className="w-full">
              <img className="w-full h-40 object-cover" src={userData?.avatar_image || 'https://i.imgur.com/tGkhOIR.jpg'} alt={userData?.username || 'Profile Picture'} />
            </div>
            <div className="p-8 w-full">
              <div className="flex items-center mb-4">
                <img className="w-16 h-16 rounded-full mr-4" src={userData?.profile_picture || 'https://cdn-icons-png.flaticon.com/128/149/149071.png'} alt={userData?.username || 'Profile Picture'} />
                <div className="uppercase tracking-wide text-xl text-white font-bold flex items-center">
                  <a href={`https://kick.com/${userData?.username}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {userData?.username || 'None'}
                  </a>
                  {userData?.verified && (
                    <svg className="w-6 h-6 ml-1 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-gray-300 mb-4 text-lg font-bold">{userData?.bio || 'None'}</p>
              <div className="space-y-3">
                <div className="flex items-center bg-black rounded-full px-4 py-2">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="ml-2 text-gray-300 text-lg font-bold">Followers: {userData?.followers_count || 'None'}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Channel Name", value: userData?.channel_name || 'None', icon: <FaTv className="text-purple-500" /> },
                    { label: "Live", value: userData?.is_live ? 'Yes' : 'No', icon: <FaCircle className="text-red-500" /> },
                    ...(userData?.is_live ? [{ label: "Viewer Count", value: userData?.viewer_count || 'None', icon: <FaEye className="text-yellow-500" /> }] : []),
                    { label: "Created At", value: userData?.created_at ? new Date(userData.created_at).toLocaleDateString() : 'None', icon: <FaCalendar className="text-green-500" /> },
                    { label: "Country", value: userData?.country || 'None', icon: <FaGlobe className="text-blue-500" /> },
                  ].map((item, index) => (
                    <div key={index} className="bg-black rounded-full px-4 py-2 flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      <span className="font-bold text-lg mr-2">{item.label}:</span> <span className="font-bold text-lg">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Twitter", value: userData?.twitter, icon: <FaTwitter className="text-blue-400" />, url: `https://twitter.com/${userData?.twitter}` },
                    { label: "Instagram", value: userData?.instagram, icon: <FaInstagram className="text-pink-500" />, url: `https://instagram.com/${userData?.instagram}` },
                    { label: "Facebook", value: userData?.facebook, icon: <FaFacebook className="text-blue-600" />, url: `https://facebook.com/${userData?.facebook}` },
                    { label: "YouTube", value: userData?.youtube, icon: <FaYoutube className="text-red-600" />, url: `https://youtube.com/${userData?.youtube}` },
                    { label: "Discord", value: userData?.discord, icon: <FaDiscord className="text-indigo-500" />, url: `https://discord.com/invite/${userData?.discord}` },
                    { label: "TikTok", value: userData?.tiktok, icon: <FaTiktok className="text-black" />, url: `https://tiktok.com/@${userData?.tiktok}` },
                  ].filter(item => item.value && item.value !== 'None').map((item, index) => (
                    <div key={index} className="bg-black rounded-full px-4 py-2 flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      <span className="font-bold text-lg mr-2">{item.label}:</span> <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-bold text-lg text-blue-400 hover:underline">{item.value}</a>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Subscription Enabled", value: userData?.subscription_enabled ? 'Yes' : 'No', icon: <FaCreditCard className="text-green-400" /> },
                    { label: "VOD Enabled", value: userData?.vod_enabled ? 'Yes' : 'No', icon: <FaVideo className="text-orange-500" /> },
                    { label: "Can Host", value: userData?.can_host ? 'Yes' : 'No', icon: <FaHome className="text-cyan-500" /> },
                 
                  ].map((item, index) => (
                    <div key={index} className="bg-black rounded-full px-4 py-2 flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      <span className="font-bold text-lg mr-2">{item.label}:</span> <span className="font-bold text-lg">{item.value}</span>
                    </div>
                  ))}
                </div>
                {userData?.recent_categories && userData.recent_categories.length > 0 ? (
                  <div className="bg-black rounded-lg p-4 mt-4">
                    <p className="font-bold text-lg mb-2">Recent Categories:</p>
                    <div className="flex flex-wrap gap-2">
                      {userData.recent_categories.map((category, index) => (
                        <span key={index} className="px-2 py-1 rounded-full text-lg font-bold bg-green-500">
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-black rounded-lg p-4 mt-4">
                    <p className="font-bold text-lg mb-2">Recent Categories: None</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;