import * as _ from 'lodash';

export class LetterHistogramService {
    create(sentences: string[]): {[key: string]: number} {
        let letters = _.flatMap(sentences, sentence => sentence.split(''));

        let formattedLetters = _
            .chain(letters)
            .map(s => s.toLowerCase())
            .filter(s => s.match(/[a-z]/i))
            .value();
            
        let initHistogram: {[key: string]: number} = {};
        
        let histogram = _.reduce(formattedLetters, (acc, letter) => {
                acc[letter] = (acc[letter] || 0) + 1;
                return acc;
            }, initHistogram);
            
        return histogram;
    }
};