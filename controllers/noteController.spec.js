import mssql from "mssql";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getOneNote,
  updateNote,
} from "./noteController";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Note Contoller", () => {
  describe("Creating a Note", () => {
    it("Should Create a note", async () => {
      const mockNote = {
        note_title: "Reading Quran",
        note_content:
          "I will read Quran Tommorrow on Saturday before anything else",
      };
      const req = {
        body: mockNote,
      };
      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: 1,
        }),
      });
      await createNote(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "New Note Created as success",
      });
    });
    it("Should note create a project", async () => {
      const mockNote = {
        note_title: "",
        note_content:
          "I will read Quran Tommorrow on Saturday before anything else",
      };
      const req = {
        body: mockNote,
      };
      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: [0],
        }),
      });
      await createNote(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "Note Creation Failed",
      });
    });
  });

  //TESTING Update NOTE CONTROLLER
  describe("Testing Update Controller", () => {
    it("Should Update a project", async () => {
      const noteId = "celebmunyiri";
      const mockNoteUpdate = {
        note_title: "Recite Quran",
        note_content: "I will Recite quran to Jamaa",
      };
      const req = {
        params: {
          noteId,
        },
        body: mockNoteUpdate,
      };

      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: 1,
        }),
      });
      await updateNote(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "Note Update Success",
      });
    });

    it("Should Not Update a project", async () => {
      const noteId = "celebmunyiri1234";
      const mockNoteUpdate = {
        note_title: "Recite Quran",
        note_content: "I will Recite quran to Jamaa",
      };
      const req = {
        params: {
          noteId,
        },
        body: mockNoteUpdate,
      };

      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: 0,
        }),
      });

      await updateNote(req, res);
      expect(res.json).toHaveBeenCalledWith({
        message: "Note Update Failure",
      });
    });
  });

  //TESTING GET ONE NOTE CONTROLLER

  describe("GET ONE Note By Id", () => {
    it("Should return One Note", async () => {
      const noteID = "celebmunyiri1234";
      const mockNote = {
        note_title: "Recite Quran",
        note_content: "I will Recite quran to Jamaa",
      };

      const req = {
        params: {
          id: noteID,
        },
      };

      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          recordset: [mockNote],
        }),
      });

      await getOneNote(req, res);

      expect(res.json).toHaveBeenCalledWith({ note: [mockNote] });
    });
  });

  //TESTING GET ALL NOTES
  describe("Testing Get All Notes", () => {
    it("Should display All Notes", async () => {
      const mockUpNotes = [
        {
          note_title: "Write Code",
          note_content: "I will code for seven hours Tomorrow",
        },
        {
          note_title: "Watch Movie",
          note_content: "I will watch two movies tomorrow",
        },
      ];
      const req = {};
      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          recordset: mockUpNotes,
        }),
      });
      await getAllNotes(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ notes: mockUpNotes });
    });
  });

  //TEST TO DELETE A PROJECT

  describe("Test to delete a Project", () => {
    it("Should delete a Project", async () => {
      const noteId = "celebmunyiri123";
      const req = {
        params: {
          id: noteId
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
       json: jest.fn()
      }
      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: [1],
        }),
      });
      await deleteNote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Note Deleted Success" });
    });
    it("Should Not Delete A Note", async () => {
      const noteId = "celebmunyiri123";
      const req = {
        params: {
          id: noteId,
        },
      };
      jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({ rowsAffected: [0] }),
      });
      await deleteNote(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Error Deleting Note" });
    });
  });
});
