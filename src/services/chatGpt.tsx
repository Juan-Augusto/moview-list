import axios from "axios";

export async function getMovieRecommendations(movieList: any) {
  try {
    const apiKey = ""; // Substitua pela sua chave de API
    const endpoint =
      "https://api.openai.com/v1/engines/text-davinci-002/completions";

    // Montar o prompt com a lista de filmes
    const prompt = `Dê-me recomendações de filmes com base nestes filmes:\n${movieList.join(
      "\n"
    )}\nRecomende alguns filmes para mim.`;

    // Fazer a chamada para a API do ChatGPT
    const response = await axios.post(
      endpoint,
      {
        prompt,
        max_tokens: 50, // Ajuste o número de tokens conforme necessário
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    // Extrair a resposta da API
    const recommendations = response.data.choices[0].text.trim();

    return recommendations;
  } catch (error) {
    console.error("Erro ao obter recomendações:", error);
    throw error;
  }
}
