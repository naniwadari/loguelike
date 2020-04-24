import { TyleSize } from "../config";

export default (con: any, playerDrawPoint: { x: number; y: number }) => {
  con.save();

  con.strokeStyle = "black";
  con.translate(
    playerDrawPoint.x * TyleSize.x + TyleSize.x / 2,
    playerDrawPoint.y * TyleSize.y + TyleSize.y / 2
  );
  con.rotate(Math.PI / 4);

  con.beginPath();
  con.moveTo(TyleSize.x / 2 + 4, -4);
  con.lineTo(TyleSize.x / 2 + 4 + 8, -4);
  con.lineTo(TyleSize.x / 2 + 4 + 8, -4 - 4);
  con.lineTo(TyleSize.x / 2 + 4 + 8 + 8, 0);
  con.lineTo(TyleSize.x / 2 + 4 + 8, 4 + 4);
  con.lineTo(TyleSize.x / 2 + 4 + 8, 4);
  con.lineTo(TyleSize.x / 2 + 4, 4);
  con.closePath();
  con.stroke();
  con.rotate((Math.PI / 4) * 2);

  con.beginPath();
  con.moveTo(TyleSize.x / 2 + 4, -4);
  con.lineTo(TyleSize.x / 2 + 4 + 8, -4);
  con.lineTo(TyleSize.x / 2 + 4 + 8, -4 - 4);
  con.lineTo(TyleSize.x / 2 + 4 + 8 + 8, 0);
  con.lineTo(TyleSize.x / 2 + 4 + 8, 4 + 4);
  con.lineTo(TyleSize.x / 2 + 4 + 8, 4);
  con.lineTo(TyleSize.x / 2 + 4, 4);
  con.closePath();
  con.stroke();
  con.rotate((Math.PI / 4) * 2);

  con.beginPath();
  con.moveTo(TyleSize.x / 2 + 4, -4);
  con.lineTo(TyleSize.x / 2 + 4 + 8, -4);
  con.lineTo(TyleSize.x / 2 + 4 + 8, -4 - 4);
  con.lineTo(TyleSize.x / 2 + 4 + 8 + 8, 0);
  con.lineTo(TyleSize.x / 2 + 4 + 8, 4 + 4);
  con.lineTo(TyleSize.x / 2 + 4 + 8, 4);
  con.lineTo(TyleSize.x / 2 + 4, 4);
  con.closePath();
  con.stroke();
  con.rotate((Math.PI / 4) * 2);

  con.beginPath();
  con.moveTo(TyleSize.x / 2 + 4, -4);
  con.lineTo(TyleSize.x / 2 + 4 + 8, -4);
  con.lineTo(TyleSize.x / 2 + 4 + 8, -4 - 4);
  con.lineTo(TyleSize.x / 2 + 4 + 8 + 8, 0);
  con.lineTo(TyleSize.x / 2 + 4 + 8, 4 + 4);
  con.lineTo(TyleSize.x / 2 + 4 + 8, 4);
  con.lineTo(TyleSize.x / 2 + 4, 4);
  con.closePath();
  con.stroke();
  con.rotate((Math.PI / 4) * 2);

  con.beginPath();
  con.moveTo(TyleSize.x / 2 + 4, -4);
  con.lineTo(TyleSize.x / 2 + 4 + 8, -4);
  con.lineTo(TyleSize.x / 2 + 4 + 8, -4 - 4);
  con.lineTo(TyleSize.x / 2 + 4 + 8 + 8, 0);
  con.lineTo(TyleSize.x / 2 + 4 + 8, 4 + 4);
  con.lineTo(TyleSize.x / 2 + 4 + 8, 4);
  con.lineTo(TyleSize.x / 2 + 4, 4);
  con.closePath();
  con.stroke();

  con.restore();
};
