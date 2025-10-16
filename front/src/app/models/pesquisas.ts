export interface Pesquisa{
    id: number;
    titulo: string;
    subtitulo: string | null;
    autor: string;
    editora: string;
    isbn: string;
    descricao: string;
    idioma: string;
    ano_publicacao: number;
    paginas: number;
    preco: number;
    estoque: number;
    desconto: number;
    disponivel: string;
    dimensoes: string;
    peso: number;
}