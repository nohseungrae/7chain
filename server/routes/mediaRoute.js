import express from "express";
import db from "../db";
import upload from "../middleware/upload";
import { ipConfirm } from "../middleware/ipConfirm";

const mediaRoute = express.Router();

mediaRoute.get("/", async (req, res) => {
  const sql =
    "select * from media group by media_link order by reg_date DESC limit 4";
  // const sql = `SELECT * from media ORDER BY reg_date DESC limit 4`;
  const total = 3;
  try {
    db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(sql, (err, rows, fields) => {
        if (err) throw err;
        con.release();
        return res.send(rows);
      });
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});
mediaRoute.get("/all/:page", async (req, res) => {
  try {
    const page = parseInt(req.params.page) * 7 + parseInt(req.params.page);
    db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(
        `CALL spt_GetMediasAdmin(?,?,@total_row_count); SELECT @total_row_count AS total_row_count;`,
        [0, page],
        (err, rows, fields) => {
          if (err) {
            con.release();
            throw err;
          }

          // for (let index = rows.length - 1; index >= 0; index--) {
          //   const element = rows[index];
          //   if ("OkPacket" === element.constructor.name) {
          //     rows.splice(index, 1);
          //   }
          // }
          const result = rows.filter(
            (row, i) => row.constructor.name !== "OkPacket"
          );
          con.release();
          return res.send(result);
        }
      );
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});
mediaRoute.post("/upload", async (req, res) => {
  let {
    mediaLink: _media_link,
    mediaName: _media_name,
    title: _title,
    description: _content,
    checkedA: _is_7chain,
    checkedB: _is_numbers,
    regDate: _reg_date,
    poster: _poster_img_filename,
    logo: _logo_img_filename
  } = req.body;
  try {
    console.log(req.body, _is_7chain, _is_numbers);
    await db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(
        `CALL spt_RegistMedia(?,?,?,?,?,?,?,?,?,@_return); select @_return`,
        [
          _media_link,
          _media_name,
          _title,
          _content,
          _is_7chain,
          _is_numbers,
          _reg_date,
          _poster_img_filename,
          _logo_img_filename
        ],
        (err, rows, fields) => {
          if (err) {
            con.release();
            throw err;
          }
          console.log(rows, fields);
          con.release();
          return res.send(rows);
        }
      );
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});
mediaRoute.post("/image", async (req, res) => {
  try {
    await upload(req, res, error => {
      // console.log(res.req.files, "어디죠");
      if (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
      }
      return res.json({ success: true, files: res.req.files });
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});
mediaRoute.get("/delete/:no", async (req, res) => {
  const no = req.params.no;
  try {
    await db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(`CALL spt_RemoveMedia(?)`, [no], (err, rows, fields) => {
        if (err) {
          con.release();
          throw err;
        }
        console.log(rows);
        con.release();
        return res.json({ success: true });
      });
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});
mediaRoute.get("/all/7chain/:page", async (req, res) => {
  try {
    let page = parseInt(req.params.page) * 7 + parseInt(req.params.page);
    console.log(page);
    await db.getConnection((err, con) => {
      if (err) {
        con.release();
        throw err;
      }
      con.query(
        `CALL spt_GetMedias(?,?,@total_row_count); SELECT @total_row_count AS total_row_count;`,
        [0, page],
        (err, rows, fields) => {
          if (err) {
            con.release();
            throw err;
          }

          // for (let index = rows.length - 1; index >= 0; index--) {
          //   const element = rows[index];
          //   if ("OkPacket" === element.constructor.name) {
          //     rows.splice(index, 1);
          //   }
          // }
          const result = rows.filter(
            (row, i) => row.constructor.name !== "OkPacket"
          );
          // const send = encodeURIComponent(uploadData);
          con.release();
          return res.json({ result });
        }
      );
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});
export default mediaRoute;
