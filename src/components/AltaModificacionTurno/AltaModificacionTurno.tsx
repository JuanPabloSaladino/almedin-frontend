import { SetStateAction, useContext, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

import { FormHelperText, MenuItem, Select, TextField } from '@mui/material'
import { Form, FormikConfig, FormikProvider, useFormik } from 'formik'
import { IFormInitialValues, Props } from './alta-modificacion-turno'
import { initialValues, style } from './AltaModificacionTurno.constants'
import { IEspecialista, ISocio, ITurno } from '../../types'
import { TurnosAPI } from '../../api/turnos-api'

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { EspecialistasAPI } from '../../api/especialistas-api'
import { SociosAPI } from '../../api/socios-api'
import { AppContext } from '../../context/AppContext'

export const AltaModificacionTurno: React.FC<Props> = ({
                                                       handleCloseDialog,
                                                       handleSubmit,
                                                       initialFormValues,
                                                       openDialog,
                                                       title,
                                                       selectedIdRow
                                                     }) => {
  const [turnoEspecialista, setTurnoEspecialista] = useState<Dayjs>( dayjs() )
  const [turno, setTurno] = useState<ITurno>()
  const [profesionales, setProfesionales] = useState<IEspecialista[]>([]);
  const [socios, setSocios] = useState<ISocio[]>([]);
  const [turnoCancelado, setTurnoCancelado] = useState<boolean>(false);

  const { setTurnos } = useContext(AppContext) 

  const formikProps: FormikConfig<IFormInitialValues> = {
    enableReinitialize: true,
    initialValues: { ...initialValues, ...initialFormValues },
    onSubmit: async (values: any) => {
      if (!values.fechaTurno) {
        formik.setFieldError('fechaTurno', 'Debe seleccionar una fecha de turno');
        return;
      }

      handleSubmitData(values);

      TurnosAPI
        .getTurnos()
        .then((turnos) => setTurnos(turnos))

      handleCloseDialog();
    }
  }

  const formik = useFormik(formikProps)

  const handleSubmitData = (turno: ITurno) => {
    handleSubmit(turno)
  }

  const toggleCancelado = () => {
    const newCanceladoValue = !turnoCancelado;

    setTurnoCancelado(newCanceladoValue);
    
    formik.setFieldValue('cancelado', newCanceladoValue);
  };

  const disableDays = (date: Dayjs) => {
    return !date.isSame(turnoEspecialista, 'day');

  };

  useEffect(() => {
    if(turno){
      EspecialistasAPI
        .getEspecialistas()
        .then((especialistas: IEspecialista[]) => setTurnoEspecialista(
          dayjs(especialistas.filter(especialista => especialista.id === turno.profesionalID)[0].horarios[0]))
        )

        formik.setFieldValue('socioID', turno.socioID)
        formik.setFieldValue('profesionalID', turno.profesionalID)
        formik.setFieldValue('id', selectedIdRow)
        formik.setFieldValue('motivoDeConsultaTurno', turno.motivoDeConsultaTurno)

        EspecialistasAPI
          .getEspecialistas()
          .then((especialistas: IEspecialista[]) => setProfesionales(especialistas))
    }
    
  }, [turno])

  useEffect(( ) => {
    if(selectedIdRow){
      TurnosAPI
        .getTurnoByID(selectedIdRow)
        .then((turno: ITurno) => {
            setTurno(turno)
        })
    }
  }, [selectedIdRow])

  useEffect(( ) => {
    EspecialistasAPI
      .getEspecialistas()
      .then((especialistas: IEspecialista[]) => setProfesionales(especialistas))

      SociosAPI
        .getSocios()
        .then((sociosListados: SetStateAction<ISocio[]>) => setSocios(sociosListados))
  }, [])

  return (
      <>
        <Dialog
            fullWidth={ true }
            maxWidth="sm"
            open={ openDialog }
            onClose={ () => {
              formik.resetForm()
              handleCloseDialog()
            } }
        >
          <DialogTitle sx={ style }>{ title }</DialogTitle>
          <FormikProvider value={ formik }>
            <Form noValidate>
              <DialogContent sx={ style }>
                <TextField
                    fullWidth
                    label="Motivo de consulta"
                    name="motivoDeConsultaTurno"
                    margin="dense"
                    multiline
                    rows={ 2 }
                    variant="outlined"
                    onChange={ formik.handleChange }
                    value={ formik.values.motivoDeConsultaTurno }
                />
                <Select
                  fullWidth
                  label="socioID"
                  name="socioID"
                  onChange={ formik.handleChange }
                  value={ formik.values.socioID }
                  sx={{ marginY: 1 }}
                >
                  {
                    socios?.map(socio => 
                      <MenuItem key={ socio.id } value={ socio.id }>{ socio.nombre }</MenuItem>
                    )
                  }
                </Select>
                <Select
                  fullWidth
                  label="profesionalID"
                  name="profesionalID"
                  onChange={ formik.handleChange }
                  value={ formik.values.profesionalID || '' }
                  sx={{ marginY: 1 }}
                >
                  {
                    profesionales?.map(profesional => 
                      <MenuItem key={ profesional.id } value={ profesional.id }>{ profesional.nombreMedico }</MenuItem>
                    )
                  }
                </Select>
                <LocalizationProvider dateAdapter={ AdapterDayjs }>
                  <DesktopDatePicker
                    label="Fecha del turno"
                    onChange={(date) => formik.setFieldValue('fechaTurno', date)}
                    value={ formik.values.fechaTurno }
                    shouldDisableDate={ disableDays }
                  />
                </LocalizationProvider>
                <FormHelperText
                  error
                >
                  { 
                    (formik.errors.fechaTurno && 'Ingrese una fecha válida para el turno')
                  }
                </FormHelperText>
              </DialogContent>
              <DialogActions sx={style}>
                <Button
                  color="inherit"
                  onClick={handleCloseDialog}
                  size="small"
                  variant="contained"
                  >
                    Salir
                </Button>
                <Button
                  color="success"
                  size="small"
                  type="submit"
                  variant="contained"
                  >
                    Guardar
                </Button>
                {
                  !!turno &&
                  <Button
                    color={turnoCancelado ? 'info' : 'error'}
                    size="small"
                    onClick={toggleCancelado}
                    variant="contained"
                  >
                    {turnoCancelado ? 'No cancelar' : 'Cancelar turno'}
                  </Button>
                }
            </DialogActions>
            </Form>
          </FormikProvider>
        </Dialog>
      </>
  )
}
