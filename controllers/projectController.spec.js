import mssql from "mssql";
import { createNote, getOneNote, updateNote } from "./projectController";

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
  })

//TESTING Update NOTE CONTROLLER
describe("Testing Update Controller",()=>{
  it("Should Update a project",async()=>{
    const noteId='celebmunyiri'
    const mockNoteUpdate={
      note_title:"Recite Quran",
      note_content:"I will Recite quran to Jamaa"
    }
    const req={
      params:{
        noteId
      },
      body:mockNoteUpdate
    }

    jest.spyOn(mssql,"connect").mockResolvedValueOnce({
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
    })
    
    it("Should Not Update a project",async()=>{
      const noteId='celebmunyiri1234'
    const mockNoteUpdate={
      note_title:"Recite Quran",
      note_content:"I will Recite quran to Jamaa"
    }
    const req={
      params:{
        noteId
      },
      body:mockNoteUpdate
    }

    jest.spyOn(mssql,"connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        rowsAffected: 0,
      })
    })

    await updateNote(req,res)
    expect(res.json).toHaveBeenCalledWith({
      message:"Note Update Failure"
    })
  })
  
})

//TESTING GET ONE NOTE CONTROLLER

describe("GET ONE Note By Id",()=>{
  it ("Should return One Note", async()=>{
  const noteID = 'celebmunyiri1234'
          const mockNote = {
            note_title:"Recite Quran",
            note_content:"I will Recite quran to Jamaa"
            }

          const req = {
              params: {
                  id: noteID
              }
          }

          jest.spyOn(mssql, "connect").mockResolvedValueOnce({
              request: jest.fn().mockReturnThis(),
              input: jest.fn().mockReturnThis(),
              execute: jest.fn().mockResolvedValueOnce({
                  recordset: [mockNote]
              })
          })

          await getOneNote(req, res)

          expect(res.json).toHaveBeenCalledWith({note: [mockNote]})
      })
})
})