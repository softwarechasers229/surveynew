import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/services/api.service';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { questiontype } from '../../create-survey/create-survey.component';
import { Survey, Option } from '../../create-survey/data-models';

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrls: ['./survey-response.component.css']
})
export class SurveyResponseComponent implements OnInit {
  submitted = false;
  questionDetails: any;
  surveyForm: FormGroup;
  userId:any
  selectedOption = [];
  id = 0;
  optionMultiChoice = {};
  favoriteSeason;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getByID(this.id);
    this.initForm();
  }

  private initForm() {
    this.surveyForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      questionnaires: this.formBuilder.array([])
    });
  }

  getQuestionGroupOptionsForm(index): FormArray {
    const control = this.getQuestionGroupForm(index).controls['options'];
    // control.addControl('choice', this.formBuilder.array([]));
    return control;
  }


  getQuestionGroupForm(index) {
    const control = this.getQuestionnairesIndexForm(index).controls['questionGroup'];
    return control;
  }

  getQuestionnairesIndexForm(index) {
    const control = this.getQuestionnairesForm.controls['' + index] as FormArray;
    return control;
  }


  get getQuestionnairesForm() {
    const control = this.surveyForm.controls['questionnaires'] as FormArray;
    return control;
  }

  // convenience getter for easy access to form fields
  get getSurveyForm() {
    return this.surveyForm?.controls;
  }



  addOption(index) {
    const optionGroup = new FormGroup({
      optiontext: new FormControl('', Validators.required),
    });

    const control = this.surveyForm.get('questionnaires') as FormArray;
    const indexControl = control.get('' + index) as FormArray;
    const questionGroupControl = indexControl.get('questionGroup') as FormArray;
    const optionsControl = questionGroupControl.get('options') as FormArray;
    // optionsControl.push(optionGroup);
    this.getQuestionGroupOptionsForm(index).push(optionGroup);

    // (this.surveyForm?.controls.questionnaires?.controls[index]?.controls.questionGroup?.controls.options as FormArray).push(optionGroup);
  }

  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  addOptionControls(question, index) {
    const control = this.surveyForm.get('questionnaires') as FormArray;
    const indexControl = control.get('' + index) as FormArray;
    const questionGroupControl = indexControl.controls['questionGroup'] as FormArray;
    this.getQuestionGroupForm(index).addControl('options', this.formBuilder.array([]));


    this.getQuestionGroupForm(index).patchValue(question);
    this.clearFormArray(this.getQuestionGroupOptionsForm(index) as FormArray);
    this.addOption(index);
    this.addOption(index);
  }

  setQuestionnaires(que, questionType) {
    const questions = que;
    let control = <FormArray>this.surveyForm.controls.questionnaires;
    que.forEach((x, i) => {
      this.optionMultiChoice[i] = [];
      x.questionGroup.options.forEach((xx, ii) => {
        this.optionMultiChoice[i].push(xx.optiontext);
      });

      const surveyQuestionItem = this.formBuilder.group({
        questiontitle: new FormControl({ value: x.questiontitle, disabled: true }, Validators.required),
        questiontype: new FormControl(x.questiontype, Validators.required),
        questionGroup: new FormGroup({})
      });

      control.push(surveyQuestionItem);
      // this.setQuestionGroupOptions(x.questionGroup, i);
    });

    let controls = <FormArray>this.surveyForm.controls.questionnaires;

    controls.controls.forEach((x, i) => {
      this.getQuestionGroupForm(i).addControl('options', this.formBuilder.array([]));
      if (questionType === 'Short Answer') {
        this.getQuestionGroupForm(i).addControl('answerText', new FormControl('', [Validators.required]));
      } else {
        this.getQuestionGroupForm(i).addControl('answerText', new FormControl('', [Validators.required]));
      }


      const optionControl = this.getQuestionGroupForm(i).controls['options'] as FormArray;

      const ffff = questions[i].questionGroup.options;
      console.log(ffff);
      ffff.forEach((xx, ii) => {
        // xx.answerText = new FormControl('', [Validators.required]);
        optionControl.controls.push(xx);
      });

      console.log(this.getQuestionGroupForm(i));
    });

    let controlaaa = <FormArray>this.surveyForm.controls.questionnaires;

    console.log(controlaaa);
  }

  setQuestionGroupOptions(questionGroup, i) {
    const control = this.getQuestionGroupForm(i) as FormArray;
  }


  prepareSurvey() {
    const formData = this.surveyForm.value;
    console.log(formData);
    const questionnaires = formData.questionnaires;
    const survey = formData;
    let choices: any = [];

    questionnaires.forEach((question, index, array) => {
      choices.push({
        questiontype: question.questiontype,
        questiontitle: question.questiontitle,
        answerText: question.questionGroup?.answerText
      });
    });

    // survey.questionItem = questionItem;
    survey.surveyId = this.id;
    survey.userId = this.userId;
    survey.choices = choices;

    console.log(survey);
    console.log('posting survey');
    return survey;
  }

  add(body) {
    this.apiService.post('result', body)
      .subscribe(
        response => {
          console.log(response);
          this.toastr.success(response.message || 'Survey submitted Successful');
          // this.router.navigate(['/login']);
        },
        error => {
          this.toastr.error(error.error.message);
          console.log(error);
        });
  }


  onAddQuestion() {
    console.log(this.surveyForm);
    const surveyQuestionItem = new FormGroup({
      questiontitle: new FormControl('', Validators.required),
      questiontype: new FormControl('', Validators.required),
      questionGroup: new FormGroup({})
    });

    (this.surveyForm.get('questionnaires') as FormArray).push(surveyQuestionItem);

  }

  getByID(id: number) {
    this.apiService.get('survey/' + id)
      .subscribe(
        (result: any) => {
          this.toastr.success('Survey fetch successfull');
          this.questionDetails = result.data;
          console.log(this.questionDetails);
          this.surveyForm.patchValue(result.data);
          this.userId = result.data.user;
          result.data.questionnaires = result.data.questionnaires.map((val) => {
            val.questionGroup = { options: val.options };
            return val;
          });
          this.setQuestionnaires(result.data.questionnaires, result.data.type);
        },
        (error: any) => {
          // this.toastr.error(error);
          console.log(error);
        });
  }

  onSubmit() {
    this.add(this.prepareSurvey());
  }
}