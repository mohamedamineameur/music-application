import {Music} from "../models/music.model.js";
// il faut importer aussi le model artiste pour faire les relations
// import {Artiste} from "../models/artiste.model.js";

export const createMusic = async (req, res) => {
    try {
        // il faut que dans le body tu mets le titre et l'artisteId

        // alors que dans le body tu mets juste le titre et tu as oublier l'artisteId
        const { titre} = req.body;
        // const { artisteId } = req.body;

        // il faut d'abord verifier si l'artiste existe

        // const artiste = await Artiste.findByPk(artisteId);
        // if (!artiste) {
        //     return res.status(404).json({ error: 'Artiste not found' });
        // }

        // ensuite tu peux creer la musique en associant l'artiste
        // const newMusic = await Music.create({ titre, artisteId});
        const newMusic = await Music.create({ titre});
        res.status(201).json(newMusic);
    }   catch (error) {
        res.status(500).json({ error: 'Failed to create music' });
    }   
};
export const getAllMusics = async (req, res) => {
    try {
        const musics = await Music.findAll();   
        res.status(200).json(musics);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve musics' });
    }
};

export const getMusicById = async (req, res) => {
    try {
        const { id } = req.params;
        const music = await Music.findByPk(id);
        if (music) {
            res.status(200).json(music);
        } else {
            res.status(404).json({ error: 'Music not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve music' });
    }
};
export const updateMusic = async (req, res) => {
    try {
        const { id } = req.params;  
        const { titre } = req.body;
        const music = await Music.findByPk(id);
        if (music) {
            music.titre = titre;
            await music.save();
            res.status(200).json(music);
        } else {
            res.status(404).json({ error: 'Music not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update music' });
    }
};
export const deleteMusic = async (req, res) => {
    try {
        const { id } = req.params;
        const music = await Music.findByPk(id);
        if (music) {
            await music.destroy();  
            res.status(200).json({ message: 'Music deleted successfully' });
        } else {
            res.status(404).json({ error: 'Music not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete music' });
    }
};








