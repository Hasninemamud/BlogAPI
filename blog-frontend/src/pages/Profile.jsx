import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ first_name: "", last_name: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("accounts/profile/")
      .then((res) => {
        setUser(res.data);
        setForm({
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
        });
        setImagePreview(res.data.profile?.image ? (
          res.data.profile.image.startsWith("http")
            ? res.data.profile.image
            : `${import.meta.env.VITE_API_URL}${res.data.profile.image}`
        ) : null);
      })
      .catch(() => {
        alert("Please login first");
        navigate("/login");
      })
      .finally(() => setIsLoading(false));
  }, [navigate]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("first_name", form.first_name);
    formData.append("last_name", form.last_name);
    if (image) formData.append("image", image);
    
    try {
      await API.put("accounts/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile updated!");
      setEdit(false);
      // Refresh user data
      const res = await API.get("accounts/profile/");
      setUser(res.data);
      setForm({
        first_name: res.data.first_name || "",
        last_name: res.data.last_name || "",
      });
      setImagePreview(res.data.profile?.image ? (
        res.data.profile.image.startsWith("http")
          ? res.data.profile.image
          : `${import.meta.env.VITE_API_URL}${res.data.profile.image}`
      ) : null);
      setImage(null);
    } catch {
      alert("Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-full border-4 border-indigo-100 shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center border-4 border-indigo-100 shadow-lg">
                    <span className="text-4xl font-bold text-indigo-600">
                      {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                    </span>
                  </div>
                )}
                
                {edit && (
                  <label className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 cursor-pointer shadow-md hover:bg-indigo-700 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>

            {!edit ? (
              /* View Mode */
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Username</p>
                      <p className="mt-1 text-lg text-gray-900">{user.username}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">First Name</p>
                      <p className="mt-1 text-lg text-gray-900">
                        {user.first_name || <span className="text-gray-400 italic">Not set</span>}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Last Name</p>
                      <p className="mt-1 text-lg text-gray-900">
                        {user.last_name || <span className="text-gray-400 italic">Not set</span>}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => setEdit(true)}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                </div>
              </div>
            ) : (
              /* Edit Mode */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Profile Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        id="first_name"
                        type="text"
                        value={form.first_name}
                        onChange={e => setForm({ ...form, first_name: e.target.value })}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                        placeholder="Enter your first name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        id="last_name"
                        type="text"
                        value={form.last_name}
                        onChange={e => setForm({ ...form, last_name: e.target.value })}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                        placeholder="Enter your last name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Image
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-200">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-1 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Changes
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setEdit(false)}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;