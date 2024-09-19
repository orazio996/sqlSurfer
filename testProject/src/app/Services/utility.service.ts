import { Injectable } from '@angular/core';
import { diffWords } from 'diff';
import { diff_match_patch } from 'diff-match-patch';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  static parseJwt(token:string) {
    if(!token) return null;
    const parts = token.split('.');
    const header = JSON.parse(UtilityService.base64UrlDecode(parts[0]));
    const payload = JSON.parse(UtilityService.base64UrlDecode(parts[1]));
    return { header, payload };
  }

  static base64UrlDecode(str:string):string{
    // Aggiungi padding se necessario
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
        str += '=';
    }
    // Decodifica la stringa Base64
    const decodedStr = atob(str);
    // Decodifica la stringa UTF-8
    return decodeURIComponent(encodeURIComponent(decodedStr));
  }

  static flagSwitch(flag:boolean){
    if(flag){flag=false}
    else{flag=true}
    return flag;
  }
 /*
  static compareAndHighlight(sql1:string, sql2: string){
    const queries1 = UtilityService.splitQueries(sql1).map(UtilityService.normalizeQuery);
    const queries2 = UtilityService.splitQueries(sql2).map(UtilityService.normalizeQuery);

    // Unisci le query per confronto e aggiungi evidenziazione
    let output = '';
    queries1.forEach((query1:string, index:number) => {
        const query2 = queries2[index] || ''; // Gestisce il caso in cui una query è mancante
        output += UtilityService.diffQueries(query1, query2) + '<br><br>';
    });

    return output;
  }

  static normalizeQuery(query:string) {
    // rimuove i commenti
    query = query.replace(/(--[^\n\r]*|\/\*[\s\S]*?\*\/)/g, '');

    // rimuove spazi extra
    query = query.replace(/\s+/g, ' ').trim();

    // Converti in maiuscolo per uniformità
    query = query.toLocaleLowerCase();
    return query
  }

  static splitQueries(sql:string) {
    // Divide le query basandosi sul punto e virgola
    return sql.split(';').map(q => q.trim()).filter(q => q.length > 0);
  }

  static diffQueries(query1:string, query2:string) {

    // Ottieni la differenza tra le due query
    const diffResult = diffWords(query1, query2);

    // Genera HTML con evidenziazione delle differenze
    let result = diffResult.map((part:any) => {
        const cssClass = part.added ? 'added' : part.removed ? 'removed' : 'unchanged';
        return `<span class="${cssClass}">${part.value}</span>`;
    }).join('');

    return result;
  }*/

     static removeComments(str:string) {
      // Rimuove commenti multilinea (/* */) e commenti a riga singola (//)
      return str.replace(/\/\*[\s\S]*?\*\//g, '')  // Rimuove commenti multilinea
                .replace(/\/\/.*/g, '')            // Rimuove commenti a riga singola
                .trim();                           // Rimuove eventuali spazi bianchi in eccesso
  }
  
  // Funzione per confrontare due stringhe e restituire una stringa HTML con differenze evidenziate
   static diff(stringa1:string, stringa2:string) {
      // Utilizza la libreria diff-match-patch per calcolare le differenze
      const dmp = new diff_match_patch();
  
      // Rimuovi i commenti dalle stringhe
      const cleanedStr1 = UtilityService.removeComments(stringa1);
      const cleanedStr2 = UtilityService.removeComments(stringa2);
  
      // Ottieni il diff tra le due stringhe
      const diffs = dmp.diff_main(cleanedStr1, cleanedStr2);
  
      // Creiamo una stringa HTML basata sulle differenze
      dmp.diff_cleanupSemantic(diffs);  // Ottimizza il diff
      let html = '';
  
      diffs.forEach((part: [any, any]) => {
          const [operation, text] = part;
  
          if (operation === 1) { // Aggiunta
              html += `<span class="added">${UtilityService.escapeHtml(text)}</span>`;
          } else if (operation === -1) { // Rimozione
              html += `<span class="removed">${UtilityService.escapeHtml(text)}</span>`;
          } else { // Nessuna modifica
              html += `<span class="unchanged">${UtilityService.escapeHtml(text)}</span>`;
          }
      });
  
      return html.replace(/\n/g, '<br>');
  }
  
  // Funzione di escape per evitare problemi con caratteri speciali in HTML
  static escapeHtml(text:string) {
      return text.replace(/&/g, '&amp;')
                 .replace(/</g, '&lt;')
                 .replace(/>/g, '&gt;')
                 .replace(/"/g, '&quot;')
                 .replace(/'/g, '&#039;');
  }

}
