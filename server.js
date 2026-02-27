import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/gerar-pix", async (req, res) => {
  const { valor } = req.body;

  try {

    const resposta = await fetch("https://api.ironpayapp.com/v1/transactions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.IRONPAY_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: Math.round(valor * 100),
        offer_hash: "SEU_OFFER_HASH_AQUI",
        payment_method: "pix",
        customer: {
          name: "Cliente",
          email: "cliente@email.com",
          phone_number: "21999999999",
          document: "09115751031",
          street_name: "Rua",
          number: "123",
          complement: "",
          neighborhood: "Centro",
          city: "Rio de Janeiro",
          state: "RJ",
          zip_code: "20040020"
        },
        cart: [
          {
            product_hash: "SEU_PRODUCT_HASH_AQUI",
            title: "Produto",
            cover: null,
            price: Math.round(valor * 100),
            quantity: 1,
            operation_type: 1,
            tangible: false
          }
        ],
        expire_in_days: 1,
        transaction_origin: "api"
      })
    });

    const data = await resposta.json();

    res.json({
      qrCode: data.pix.qr_code_base64,
      copiaCola: data.pix.copy_paste
    });

  } catch (erro) {
    console.log(erro);
    res.status(500).json({ error: "Erro ao gerar PIX" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando"));
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
