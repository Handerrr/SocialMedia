import * as S from '../../Styles/Footer';

function Footer() {
  return (
    <S.Container>
      <S.Content>
        <S.Logo>Social</S.Logo>

        <S.Links>
          <span>Sobre</span>
          <span>Privacidade</span>
          <span>Termos</span>
          <span>Contato</span>
        </S.Links>

        <S.Copy>© 2026 Social - Desenvolvido por Daniel</S.Copy>
      </S.Content>
    </S.Container>
  );
}

export default Footer;
