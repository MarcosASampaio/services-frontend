import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // importação do fireStorage

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly baseUrl: string = 'http://localhost:3000/funcionarios'

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage // objeto responsável por salvar os arquivos no firebase
  ) { }

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.baseUrl)
  }

  // http://localhost:3000/funcionarios/
  deleteFuncionario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`)
  }

  getFuncionarioById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`)
  }

  /**
   * RXJS Operators: funções que manipulam os dados que
   * os observables te retornam
   */
  /**
   * O ? na frente do parâmetro faz com que ele seja opcional na hora de executar a função
   */
  salvarFuncionario(func: Funcionario, foto?: File) {
    /**
     * fazendo requisição POST para salvar os dados do funcionário
     * return funcionário que acabou de ser salvo
     */

    /**
     * a função pipe é utilizada para colocar os operadores do RXJS
     * que manipularão os dados que são retornados dos observables
     */

    /**
     * o pipe map manipula cada dado que o observable te retorna,
     * transformando em algo diferente e te retorna esse dado modificado
     */
    if (foto == undefined) { // se a foto não existe, será retornado um observable que apenas salva os dados básicos
      return this.http.post<Funcionario>(this.baseUrl, func)
    }

    return this.http.post<Funcionario>(this.baseUrl, func)
    .pipe(
      map(async (func) => {
        // 1° Fazer upload da imagem e recuperar o link gerado
        const linkFotoFirebase = await this.uploadImagem(foto)

        // 2° Atribuir o link gerado ao funcionário criado
        func.foto = linkFotoFirebase

        // 3° Atualizar funcionário com a foto
        return this.atualizarFuncionario(func)
      })
    )
  }

  atualizarFuncionario(func: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.baseUrl}/${func.id}`, func)
  }

  // 1° Pegar a imagem
  // 2° Fazer o upload da imagem
  // 3° Gerar o link de download e retorná-lo
  private async uploadImagem(foto: File): Promise<string> {
    // a palavra async informa que a função vai trabalhar com
    // código assíncrono, ou seja, códigos que demoram para serem executados

    const nomeDoArquivo = Date.now() // retorna a data atual em milissegundos

    // faz o upload do arquivo para o firebase
    // 1° Parâmetro: nome do arquivo
    // 2° Parâmetro: o arquivo que deve ser enviado
    const dados = await this.storage.upload(`${nomeDoArquivo}`, foto)

    // a propriedade REF é a referência do arquivo no firebase

    const downloadURL = await dados.ref.getDownloadURL() // retorna um link pro acesso da imagem

    return downloadURL
  }
}
