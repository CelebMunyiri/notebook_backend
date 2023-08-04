import mssql from "mssql";
import { createNote } from "./projectController";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
}

describe("Note Contoller", () => {
  describe("Creating a Note", () => {
    it("Should Create a note", async () => {
      const mockNote = {
        note_title: "Reading Quran",
        note_content:
          "I will read Quran Tommorrow on Saturday before anything else"
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
    })
    it("Should note create a project",async()=>{
      const mockNote={
        note_title: "",
        note_content:"I will read Quran Tommorrow on Saturday before anything else"
      }
      const req={
       body: mockNote
      }
      jest.spyOn(mssql,"connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
          rowsAffected:[0]
        })
      })
      await createNote(req,res)

      expect(res.json).toHaveBeenCalledWith({
        message:"Note Creation Failed"
      })
    })
  });
});
