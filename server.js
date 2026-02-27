import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/gerar-pix", async (req, res) => {
  const { valor } = req.body;

  try {
    const resposta = await fetch("URL_DA_IRONPAY_AQUI", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.IRONPAY_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: valor,
        paymentMethod: "pix"
      })
    });

    const data = await resposta.json();

    res.json({
      qrCode: data.pix.qrCodeBase64,
      copiaCola: data.pix.copyPaste
    });

  } catch (erro) {
    res.status(500).json({ error: "Erro ao gerar PIX" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando"));
