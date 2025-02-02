
import { phrases } from "$lib/phrases.json";
import { Chance } from "chance";
const chance = new Chance(5124312);
export function get_card_data(length:number) {
    const card_data = Object.values(phrases)
        .slice(0, length)
        .map((data, index) => {
            const options = [
                data.english,
                ...chance
                    .pickset(
                        Object.values(phrases)
                            .toSpliced(index, 1)
                            .toSorted(
                                (a, b) => -Math.abs(a.english.length - b.english.length),
                            )
                            .slice(0, 4),
                        3,
                    )
                    .map((c) => c.english),
            ];
            return {
                title: "Select Correct English",
                question: data.japanese,
                options: options,
                answer_index: 0,
            };
        });
    return card_data
}