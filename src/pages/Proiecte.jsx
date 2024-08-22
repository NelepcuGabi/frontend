import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../styles/Proiecte.css';
import { message } from 'antd';

function UploadProject() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [authors, setAuthors] = useState('');
  const [user, setUser] = useState({ id: '', name: '' });
  const [loading, setLoading] = useState(false); // Loading state

  const token = Cookies.get('accessToken');

  useEffect(() => {
    if (!token) {
      console.error('Token is null or undefined');
      return;
    }

    async function fetchUserDetails() {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const userDetails = await response.json();
          setUser(userDetails);
        } else {
          console.error('Failed to fetch user details', response.status, await response.text());
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    fetchUserDetails();
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      message.error('Te rog încarcă un fișier.');
      return;
    }

    if (file && file.type !== 'application/pdf') {
      message.error('Fișierul trebuie să fie de tip PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('difficulty', difficulty);
    formData.append('description', description);
    formData.append('file', file);
    formData.append('authors', authors);
    formData.append('userId', user.id); 
    formData.append('userName', user.name);

    setLoading(true); // Start loading

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/files/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        message.success('Proiectul a fost încărcat cu succes!');
        setTitle('');
        setDescription('');
        setFile(null);
        setAuthors('');
        setType('');
        setDifficulty('');
      } else {
        const errorData = await response.json();
        console.error('Upload error:', errorData);
        message.error(`Eroare la încărcarea proiectului: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error uploading project:', error);
      message.error('Eroare la încărcarea proiectului');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="upload-project-container">
      <h2>Încărcați un proiect</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="title">Titlu:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Tip:</label>
          <select
            id="type-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Selectează tipul</option>
            <option value="Programare">Programare</option>
            <option value="Retelistica">Retelistica</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Dificultate:</label>
          <select
            id="difficulty-select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            <option value="">Selectează dificultatea</option>
            <option value="Incepator">Incepator</option>
            <option value="Mediu">Mediu</option>
            <option value="Avansat">Avansat</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Descriere:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="authors">Autori:</label> 
          <input
            type="text"
            id="authors"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Fișier:
            <div><p>FISIERUL TREBUIE SA FIE PDF</p></div>
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Încărcare...' : 'Încărcați'}
        </button>
      </form>
    </div>
  );
}

export default UploadProject;
