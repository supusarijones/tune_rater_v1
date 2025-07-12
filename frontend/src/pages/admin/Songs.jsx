import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageSongs() {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({ title: "", artist: "", genre: "", thumbnail: "" });
  const [editingSong, setEditingSong] = useState(null);

  const fetchSongs = async () => {
    const res = await axios.get("/api/songs");
    setSongs(res.data);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingSong) {
      setEditingSong({ ...editingSong, [name]: value });
    } else {
      setNewSong({ ...newSong, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingSong) {
      await axios.put(`/api/songs/${editingSong._id}`, editingSong);
      setEditingSong(null);
    } else {
      await axios.post("/api/songs", newSong);
      setNewSong({ title: "", artist: "", genre: "", thumbnail: "" });
    }
    fetchSongs();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this song?")) {
      await axios.delete(`/api/songs/${id}`);
      fetchSongs();
    }
  };

  const handleEdit = (song) => {
    setEditingSong(song);
  };

  const cancelEdit = () => {
    setEditingSong(null);
  };

  const songForm = editingSong || newSong;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Manage Songs</h1>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 p-4 rounded shadow mb-6 space-y-3">
        <input
          type="text"
          name="title"
          value={songForm.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="input"
        />
        <input
          type="text"
          name="artist"
          value={songForm.artist}
          onChange={handleInputChange}
          placeholder="Artist"
          className="input"
        />
        <input
          type="text"
          name="genre"
          value={songForm.genre}
          onChange={handleInputChange}
          placeholder="Genre"
          className="input"
        />
        <input
          type="text"
          name="thumbnail"
          value={songForm.thumbnail}
          onChange={handleInputChange}
          placeholder="Thumbnail URL"
          className="input"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {editingSong ? "Update" : "Create"}
          </button>
          {editingSong && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-bold">{song.title}</h2>
              <p className="text-sm text-gray-500">{song.artist} • {song.genre}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(song)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(song._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
