import { useState } from 'react';
import StepServicio from './StepServicio';
import StepFechaHora from './StepFechaHora';
import StepUsuario from './StepUsuario';
import StepConfirmacion from './StepConfirmacion';


export default function MultiStepForm() {
const [step, setStep] = useState(1);
const [formData, setFormData] = useState({
servicio: '',
fecha: '',
hora: '',
nombre: '',
apellido: '',
edad: '',
telefono: '',
email: '',
diabetes: false,
circulacion: false,
alergias: false,
notificacion: []
});


const next = () => setStep(step + 1);
const back = () => setStep(step - 1);


const update = (data) => setFormData({ ...formData, ...data });


return (
<div>
{step === 1 && <StepServicio data={formData} update={update} next={next} />}
{step === 2 && <StepFechaHora data={formData} update={update} next={next} back={back} />}
{step === 3 && <StepUsuario data={formData} update={update} next={next} back={back} />}
{step === 4 && <StepConfirmacion data={formData} back={back} />}
</div>
);
}