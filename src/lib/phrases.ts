
import { phrases } from "$lib/phrases.json";
import { Chance } from "chance";
const chance = new Chance(5124312);
export function get_card_data(offset:number, length:number) {
    const card_data = Object.values(phrases)
        .slice(offset, offset+length)
        .map((data, index) => {
            const options = chance.shuffle([
                data.english,
                ...chance
                    .pickset(
                        Object.values(phrases)
                            .toSpliced(index, 1)
                            .toSorted(
                                (a, b) => -Math.abs(a.english.length - b.english.length),
                            )
                            .slice(0, 20),
                        3,
                    )
                    .map((c) => c.english),
            ]);
            return {
                title: "Select Correct English",
                question: data.japanese,
                options: options,
                answer_index: options.indexOf(data.english),
            };
        });
    return card_data
}