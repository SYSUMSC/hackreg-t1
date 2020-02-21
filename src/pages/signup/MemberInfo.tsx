import { FormikErrors, FormikProps, FormikTouched } from 'formik';
import React, { FC } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './MemberInfo.css';
import {
  MemberFormValues,
  SignupFormData
} from '../../redux/type/signupForm.type';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

type MemberInfoContentProps = {
  submitting: boolean;
  prefix: string;
  touchedItems?: FormikTouched<MemberFormValues>;
  erroredItems?: FormikErrors<MemberFormValues>;
  setAsCaptain: () => void;
  remove: () => void;
  isCaptain: boolean;
} & FormikProps<SignupFormData>;

const MemberInfoContent: FC<MemberInfoContentProps> = ({
  values,
  getFieldProps,
  submitting,
  prefix,
  touchedItems,
  erroredItems,
  setAsCaptain,
  remove,
  isCaptain
}) => (
  <>
    <ButtonGroup className="member-button-container">
      {isCaptain ? null : (
        <Button
          variant="outline-primary"
          disabled={submitting || values.confirmed}
          onClick={setAsCaptain}
        >
          设为队长
        </Button>
      )}
      <Button
        variant="outline-danger"
        disabled={isCaptain || submitting || values.confirmed}
        onClick={remove}
      >
        {isCaptain ? '不能移除队长' : '移除队员'}
      </Button>
    </ButtonGroup>
    <Form.Group as={Row} controlId={`${prefix}.name`}>
      <Form.Label column={true} sm={2} className="text-left text-sm-right">
        姓名
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          type="text"
          maxLength={20}
          isInvalid={!!touchedItems?.name && !!erroredItems?.name}
          disabled={submitting || values.confirmed}
          {...getFieldProps(`${prefix}.name`)}
        />
        <Form.Text className="text-muted font-weight-light">
          长度不得超过20个字
        </Form.Text>
      </Col>
    </Form.Group>
    <Form.Group as={Row} controlId={`${prefix}.gender`}>
      <Form.Label column={true} sm={2} className="text-left text-sm-right">
        性别
      </Form.Label>
      <Col sm={10} className="radio-container">
        <Form.Control
          as="select"
          disabled={submitting || values.confirmed}
          isInvalid={!!touchedItems?.gender && !!erroredItems?.gender}
          {...getFieldProps(`${prefix}.gender`)}
        >
          <option value="0">男</option>
          <option value="1">女</option>
          <option value="2">其他</option>
        </Form.Control>
      </Col>
    </Form.Group>
    <Form.Group as={Row} controlId={`${prefix}.email`}>
      <Form.Label column={true} sm={2} className="text-left text-sm-right">
        邮箱
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          type="email"
          maxLength={50}
          isInvalid={!!touchedItems?.email && !!erroredItems?.email}
          disabled={submitting || values.confirmed}
          {...getFieldProps(`${prefix}.email`)}
        />
        <Form.Text className="text-muted font-weight-light">
          重要信息，请确保填写正确
        </Form.Text>
      </Col>
    </Form.Group>
    <Form.Group as={Row} controlId={`${prefix}.phone`}>
      <Form.Label column={true} sm={2} className="text-left text-sm-right">
        手机号码
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          type="tel"
          maxLength={20}
          isInvalid={!!touchedItems?.phone && !!erroredItems?.phone}
          disabled={submitting || values.confirmed}
          {...getFieldProps(`${prefix}.phone`)}
        />
        <Form.Text className="text-muted font-weight-light">
          仅接受内地及香港手机号码
        </Form.Text>
      </Col>
    </Form.Group>
    <Form.Group as={Row} controlId={`${prefix}.size`}>
      <Form.Label column={true} sm={2} className="text-left text-sm-right">
        衣服尺码
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          as="select"
          isInvalid={!!touchedItems?.size && !!erroredItems?.size}
          disabled={submitting || values.confirmed}
          {...getFieldProps(`${prefix}.size`)}
        >
          <option value="0">XS</option>
          <option value="1">S</option>
          <option value="2">M</option>
          <option value="3">L</option>
          <option value="4">XL</option>
          <option value="5">XXL</option>
          <option value="6">XXXL</option>
        </Form.Control>
        <Form.Text className="text-muted font-weight-light">
          用于比赛专用T恤的制作
        </Form.Text>
      </Col>
    </Form.Group>
    <Form.Group as={Row} controlId={`${prefix}.school`}>
      <Form.Label column={true} sm={2} className="text-left text-sm-right">
        学校
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          type="text"
          maxLength={15}
          isInvalid={!!touchedItems?.school && !!erroredItems?.school}
          disabled={submitting || values.confirmed}
          {...getFieldProps(`${prefix}.school`)}
        />
        <Form.Text className="text-muted font-weight-light">
          建议格式：城市名+学校名，不要写缩写，长度不得超过15字
        </Form.Text>
      </Col>
    </Form.Group>
    <Form.Group as={Row} controlId={`${prefix}.education`}>
      <Form.Label column={true} sm={2} className="text-left text-sm-right">
        学历
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          as="select"
          isInvalid={!!touchedItems?.education && !!erroredItems?.education}
          disabled={submitting || values.confirmed}
          {...getFieldProps(`${prefix}.education`)}
        >
          <option value="0">本科生</option>
          <option value="1">研究生</option>
          <option value="2">其他</option>
        </Form.Control>
        <Form.Text className="text-muted font-weight-light">
          正在读某某生的，也可选对应的那一项
        </Form.Text>
      </Col>
    </Form.Group>
    <Form.Group as={Row} controlId={`${prefix}.grade`}>
      <Form.Label column={true} sm={2} className="text-left text-sm-right">
        年级
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          type="text"
          maxLength={10}
          isInvalid={!!touchedItems?.grade && !!erroredItems?.grade}
          disabled={submitting || values.confirmed}
          {...getFieldProps(`${prefix}.grade`)}
        />
        <Form.Text className="text-muted font-weight-light">
          建议格式：XXXX（入学年份）级，长度不得超过10个字
        </Form.Text>
      </Col>
    </Form.Group>
    <Form.Group as={Row} controlId={`${prefix}.profession`}>
      <Form.Label column={true} sm={2} className="text-left text-sm-right">
        专业
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          type="text"
          maxLength={20}
          isInvalid={!!touchedItems?.profession && !!erroredItems?.profession}
          disabled={submitting || values.confirmed}
          {...getFieldProps(`${prefix}.profession`)}
        />
        <Form.Text className="text-muted font-weight-light">
          填写现在正在就读的专业的名称，长度不得超过20个字
        </Form.Text>
      </Col>
    </Form.Group>
    <Form.Group as={Row} controlId={`${prefix}.experience`}>
      <Form.Label column={true} sm={2} className="text-left text-sm-right">
        个人经历
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          as="textarea"
          rows="5"
          maxLength={100}
          isInvalid={!!touchedItems?.experience && !!erroredItems?.experience}
          disabled={submitting || values.confirmed}
          {...getFieldProps(`${prefix}.experience`)}
        />
        <Form.Text className="text-muted font-weight-light">
          吹吹水介绍一下自己，长度不得超过100个汉字
        </Form.Text>
      </Col>
    </Form.Group>
  </>
);

type MemberInfoCardProps = {
  submitting: boolean;
  index: number;
  setAsCaptain: () => void;
  remove: () => void;
} & FormikProps<SignupFormData>;

const MemberInfoCard: FC<MemberInfoCardProps> = props => {
  const { index, touched, errors, values } = props;
  const prefix = `form.memberInfo[${index}]`;
  const touchedItems = touched?.form?.memberInfo?.[index];
  const erroredItems = errors?.form?.memberInfo?.[index] as
    | FormikErrors<MemberFormValues>
    | undefined;
  const isCaptain = values.form.memberInfo[index].captain;
  return (
    <Card {...(!!erroredItems && !!touchedItems && { border: 'danger' })}>
      <Accordion.Toggle as={Card.Header} eventKey={prefix}>
        {values.form.memberInfo[index].name}&nbsp;&nbsp;
        <span className="text-muted">{isCaptain ? '队长' : '队员'}</span>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={prefix}>
        <Card.Body>
          <MemberInfoContent
            {...{
              prefix,
              touchedItems,
              erroredItems,
              isCaptain,
              ...props
            }}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

type AddMemberCardProps = {
  submitting: boolean;
  noMember: boolean;
  addMember: (isCaptain: boolean) => void;
} & FormikProps<SignupFormData>;

const AddMemberCard: FC<AddMemberCardProps> = ({
  touched,
  errors,
  values,
  noMember,
  submitting,
  addMember
}) => (
  <Card
    key="addMember"
    {...(!!errors?.form?.memberInfo &&
      touched?.form?.memberInfo &&
      noMember && { border: 'danger' })}
  >
    <Card.Header
      className="card-add-member"
      onClick={() => {
        if (!submitting && !values.confirmed) {
          addMember(noMember);
        }
      }}
    >
      添加队员...
    </Card.Header>
  </Card>
);

type MemberInfoProps = {
  submitting: boolean;
  setOneAsCaptain: (index: number) => void;
  removeOne: (index: number) => void;
  addMember: (isCaptain: boolean) => void;
} & FormikProps<SignupFormData>;

const MemberInfo: FC<MemberInfoProps> = props => {
  const { submitting, values, setOneAsCaptain, removeOne } = props;
  const memberInfo = values.form.memberInfo;
  return (
    <>
      <h4>队员信息</h4>
      <Accordion>
        {memberInfo.map((_, index) => (
          <MemberInfoCard
            key={index}
            index={index}
            submitting={submitting}
            setAsCaptain={() => setOneAsCaptain(index)}
            remove={() => removeOne(index)}
            {...props}
          />
        ))}
        {memberInfo.length >= 6 ? null : (
          <AddMemberCard
            submitting={submitting}
            noMember={memberInfo.length === 0}
            {...props}
          />
        )}
      </Accordion>
      <Form.Text className="text-muted font-weight-light">
        每个队伍人数在1~6之间，并且必须有一名队长。
      </Form.Text>
    </>
  );
};

export default MemberInfo;
