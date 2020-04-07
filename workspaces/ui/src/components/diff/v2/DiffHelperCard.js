import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import {DocDivider} from '../../requests/DocConstants';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {CardActions} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {DiffContext} from './DiffContext';
import {mapScala, CompareEquality} from '@useoptic/domain';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'sticky',
    top: 120
  },
  header: {
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
    paddingLeft: 11,
    paddingTop: 14,
    paddingBottom: 9,
  },
  font: {
    fontSize: 13,
    fontWeight: 800,
    fontFamily: '\'Source Code Pro\', monospace'
  },
  icon: {
    paddingRight: 0,
  },
  formControl: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(1) + 7,
    marginBottom: 7,
  },
  suggestion: {
    fontWeight: 400,
    marginLeft: -5,
    fontSize: 12
  },
  buttons: {
    textAlign: 'right',
    padding: 8
  }
}));


export const DiffHelperCard = (props) => {
  const classes = useStyles();
  const {inRequest, inResponse} = props;
  const {selectedInterpretation, setSelectedInterpretation, selectedDiff, acceptSuggestion, clearPreview} = useContext(DiffContext);
  const showIt = selectedDiff && selectedDiff.inRequest && inRequest || selectedDiff.inResponse && inResponse;

  if (!showIt) {
    return null;
  }

  const suggestions = selectedDiff.suggestions;

  return (
    <div className={classes.root}>
      <Card elevation={3}>
        <div className={classes.header}>
          <Typography className={classes.font} variant="subtitle1">{selectedDiff.description.summary}</Typography>
          <div style={{flex: 1, minWidth: 20}}/>
          <PulsingOptic />
        </div>

        <DocDivider />

        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup>
            {mapScala(suggestions)(suggestion => {
              return <FormControlLabel
                onClick={() => setSelectedInterpretation(suggestion)}
                control={<Radio size="small" color="primary"  value={suggestion} checked={selectedInterpretation && CompareEquality.betweenWithoutCommands(suggestion, selectedInterpretation)}/>}
                label={<Typography variant="subtitle2" className={classes.suggestion}>{suggestion.action}</Typography>}
              />
            })}

          </RadioGroup>
        </FormControl>

        <DocDivider />

        <div className={classes.buttons}>
          <Button size="small" onClick={clearPreview}>Ignore</Button>
          <Button color="primary" size="small" disabled={!selectedInterpretation} onClick={() => acceptSuggestion(selectedInterpretation)}>Approve</Button>
        </div>

      </Card>
    </div>
  );
};


export const PulsingOptic = () => (
  <div className={'blob'} style={{marginRight: 9}}>
    <img src="/optic-logo.svg" width={32} height={32}/>
  </div>
)