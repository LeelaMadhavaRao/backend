import type { Model, Document} from 'mongoose';
import { Schema, model } from 'mongoose';

interface ISequence extends Document {
    nextSeqNumber?: number;
}

export class SequenceGenerator {

    public Sequence: Model<ISequence>;

    constructor(name: string, initial: number) {
        const sequenceSchema = new Schema({
            nextSeqNumber: { type: Number, default: initial }
        });
        this.Sequence = model<ISequence>(name + 'Seq', sequenceSchema);
    }

    async getNextSeq() {
        const data = await this.Sequence.findOne().lean()
        return data?.nextSeqNumber
    }

    async updateSequence(nextSeqNumber: number) {
        return this.Sequence.findOneAndUpdate({}, { $set: { nextSeqNumber } }).lean()
    }

    public async incrementByOne() {
        const data = await this.Sequence.findOne().lean()
        if(!data) {
            const seq = await this.Sequence.create({})
            return seq.nextSeqNumber
        }
        const seq = await this.Sequence.findByIdAndUpdate(data._id, {
            $inc: { nextSeqNumber: 1 }
        }).lean()

        return (+(seq?.nextSeqNumber as number)) + 1
    }

    public async decrementByOne() {
        const seq = await this.Sequence.findOneAndUpdate(
            {  },
            { $inc: { nextSeqNumber: -1 } }
        ).lean()

        return seq?.nextSeqNumber
    }

    public async reset() {
        const seq = await this.Sequence.findOneAndUpdate(
            {},
            { $set: { nextSeqNumber: 1 } }
        ).lean()

        return seq?.nextSeqNumber
    }
}
