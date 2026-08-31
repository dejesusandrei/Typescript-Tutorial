import type { CardProps } from '../types/CardProps'

export default function Card({ children }: CardProps){
    return(
        <>
            <div>
                {children}
            </div>
        </>
    );
}