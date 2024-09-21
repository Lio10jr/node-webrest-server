
export class FindByIdTodosDtos {

    private constructor(
        public readonly id: number
    ) {}

    static find( props: {[key: string]: any}): [ string?, FindByIdTodosDtos?] {
        const { id } = props;

        if ( !id || isNaN( Number(id) ) ) return ["Id must be a valid number"];

        return [undefined, new FindByIdTodosDtos(id)]
    }
}