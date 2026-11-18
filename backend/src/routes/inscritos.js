import { Router } from "express";
import { supabase } from "../lib/supabase.js";

const router = Router();

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


router.post("/", async (req, res) => {
  const email = String(req.body?.email || "")
    .trim()
    .toLowerCase();

  if (!emailValido(email)) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "Informe um e-mail válido."
    });
  }

  const { error } = await supabase
    .from("inscritos")
    .insert({ email });

  if (error?.code === "23505") {
    return res.status(409).json({
      sucesso: false,
      mensagem: "Este e-mail já está cadastrado."
    });
  }

  if (error) {
    console.error("Erro do Supabase ao cadastrar inscrito:", error.message);

    return res.status(500).json({
      sucesso: false,
      mensagem: "Não foi possível concluir o cadastro."
    });
  }

  return res.status(201).json({
    sucesso: true,
    mensagem: "E-mail cadastrado com sucesso."
  });
});

export default router;
